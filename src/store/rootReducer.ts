import { combineReducers } from '@reduxjs/toolkit';

import { DefaultStore } from '../core/Interface/store.interface';
import settingsReducer from './../slices/settingSlice';
const reducerList: DefaultStore = {
    settings: settingsReducer,
};

const rootReducer = combineReducers(reducerList);

export default rootReducer;
