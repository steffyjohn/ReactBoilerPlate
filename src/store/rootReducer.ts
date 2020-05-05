import { combineReducers } from '@reduxjs/toolkit';

import { DefaultStore } from '../core/model/store.model';
import userReducer from '../slices/userSlice';
import toasterReducer from '../slices/toasterSlice';
import settingsReducer from './../slices/settingSlice';
const reducerList: DefaultStore = {
    user: userReducer,
    settings: settingsReducer,
    toaster: toasterReducer,
    // settings:SettngsReducer
};

const rootReducer = combineReducers(reducerList);

export default rootReducer;
