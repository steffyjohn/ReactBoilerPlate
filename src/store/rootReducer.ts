import { combineReducers } from '@reduxjs/toolkit';

import { DefaultStore } from '../core/model/store.model';
import userReducer from '../slices/userSlice';
import settingsReducer from './../slices/settingSlice';
const reducerList: DefaultStore = {
    user: userReducer,
    settings: settingsReducer,
    // settings:SettngsReducer
};

const rootReducer = combineReducers(reducerList);

export default rootReducer;
