import { createSlice } from '@reduxjs/toolkit';
import { getTheme } from './../components/utiliities/utilities';
import { Settings } from '../core/model/user.model';

const initialState: Settings = {
    open: true,
    isDefaultTheme: false,
    layout: getTheme('dark'),
};
const settings = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        getToggleSettings(state, action) {
            const { open } = action.payload;
            state.open = open;
        },
        changeDefaultTheme(state, action) {
            const { isDefaultTheme } = action.payload;
            state.isDefaultTheme = isDefaultTheme;
            state.layout = !isDefaultTheme ? getTheme('dark') : getTheme('light');
        },
    },
});
export const { getToggleSettings, changeDefaultTheme } = settings.actions;
export default settings.reducer;
