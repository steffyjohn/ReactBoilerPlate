import { createSlice } from '@reduxjs/toolkit';
import { Settings } from '../core/model/user.model';

const initialState: Settings = {
    open: false,
};
const settings = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        getToggleSettings(state, action) {
            const { open } = action.payload;
            state.open = open;
        },
    },
});
export const { getToggleSettings } = settings.actions;
export default settings.reducer;
