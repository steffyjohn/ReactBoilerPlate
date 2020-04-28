import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { showToaster } from '../../slices/toasterSlice';
import { signIn } from '../../slices/userSlice';
import { DefaultStore } from '../../core/model/store.model';
import { SignInError } from '../../core/model/error.model';

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const SigninSignupDialog = () => {
    const dispatch = useDispatch();
    const { isSignedIn } = useSelector((state: DefaultStore) => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<SignInError>({});

    useEffect(() => {
        if (isSignedIn) {
            setPassword('');
            dispatch(showToaster({ message: 'Successfully logged in' })); //Sample code only
        }
    }, [isSignedIn, dispatch]);

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name == 'email') {
            setEmail(value);
        } else if (name == 'password') {
            setPassword(value);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const error: SignInError = {};

        if (!email) {
            error.email = 'Please provide your email id';
        } else if (!EMAIL_REGEX.test(email)) {
            error.email = 'Please provide a valid email id';
        }

        if (!password) {
            error.password = 'Please provide your password';
        } else if (!PASSWORD_REGEX.test(password)) {
            error.password =
                'Please choose a stronger password. At least 8 characters, uppercase and lowercase letters, numbers and symbols';
        }

        setErrors(error);

        if (Object.keys(error).length) {
            dispatch(showToaster({ message: 'Please fix the form errors' }));
        } else {
            dispatch(signIn({ username: email, password }));
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input autoFocus type="email" placeholder="Enter email" name="email" value={email} onChange={onChange} />
            <input
                autoFocus
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={onChange}
            />
            <button type="submit">Sign in</button>
        </form>
    );
};

export default SigninSignupDialog;
