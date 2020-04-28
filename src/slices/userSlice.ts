import { createSlice } from '@reduxjs/toolkit';

import { UserAuth } from '../core/model/user.model';

import fetch from '../core/interceptor';
import { showToaster } from './toasterSlice';

// const savedName = localStorage.getItem('session.name');
const savedName = "Reshma";
// const savedToken = localStorage.getItem('session.token');
const savedToken = '123456';
const initialState: UserAuth = {
    name: savedName || '',
    accessToken: savedToken || '',
    isSignedIn: Boolean(savedToken),
    isSignedUp: false,
    loading: false,
};

const session = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getSessionStart(state) {
            state.loading = true;
            state.isSignedUp = false;
        },
        getLoginSuccess(state, action) {
            const { name, token } = action.payload;
            state.name = name;
            state.accessToken = token;
            state.isSignedIn = true;
            localStorage.setItem('session.name', name);
            localStorage.setItem('session.token', token);
        },
        getLogoutSuccess(state) {
            state.name = '';
            state.accessToken = '';
            state.isSignedIn = false;
            localStorage.removeItem('session.name');
            localStorage.removeItem('session.token');
        },
        getSignupSuccess(state) {
            state.loading = false;
            state.isSignedUp = true;
        },
    },
});

export const { getSessionStart, getLoginSuccess, getLogoutSuccess, getSignupSuccess } = session.actions;
export default session.reducer;

export const signIn = ({ username, password }) => async (dispatch) => {
    try {
        dispatch(getSessionStart());

        const body = { username, password };
        const response: any = await fetch('/users/login/', {
            method: 'post',
            body,
        });

        dispatch(getLoginSuccess({ ...response }));
        dispatch(showToaster({ message: `Welcome ${response.name}!` }));
    } catch (error) {
        dispatch(
            showToaster({
                message: 'Unable to sign in. Please try again.',
            }),
        );
    }
};

export const logout = () => async (dispatch, getState) => {
    dispatch(getLogoutSuccess());
    dispatch(showToaster({ message: 'Sign out successful' }));

    try {
        const token = getState().session.token;

        await fetch('/users/logout/', {
            headers: { Authorization: `Token ${token}` },
        });
    } catch (error) {
        // no op
    }
};

export const signUp = ({ name, email, password }) => async (dispatch) => {
    try {
        dispatch(getSessionStart());

        const body = {
            name,
            email,
            password,
        };
        await fetch('/users/profile/', {
            method: 'post',
            body,
        });

        dispatch(getSignupSuccess());
        dispatch(showToaster({ message: `Sign up successful!` }));
    } catch (error) {
        dispatch(
            showToaster({
                message: 'Unable to sign up. Please try again.',
            }),
        );
    }
};
