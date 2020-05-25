import { createSlice } from '@reduxjs/toolkit';
import { getTheme } from './../utils/utilities';
import { Settings } from '../core/Interface/user.interface';

const initialState: Settings = {
    open: true,
    isDefaultTheme: false,
    layout: getTheme('dark'),
    isReset: false,
    isCollapsed: false,
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
        resetStore(state, action) {
            const { isReset } = action.payload;
            state.isReset = true;
        },
        setCollapsed(state, action) {
            const { isCollapsed } = action.payload;
            state.isReset = isCollapsed;
        },
    },
});
export const { getToggleSettings, changeDefaultTheme, resetStore, setCollapsed } = settings.actions;
export default settings.reducer;
