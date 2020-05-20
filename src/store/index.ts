import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './rootReducer';

const appReducer = (state, action) => {
    if (action.type === 'settings/resetStore') {
        state = undefined;
    }
    return rootReducer(state, action);
};
const store: any = configureStore({
    reducer: appReducer,
    middleware: [thunk, logger],
});

export default store;

// if (process.env.NODE_ENV === 'development' && module.hot) {
//     module.hot.accept('./rootReducer', () => {
//         const newRootReducer = require('./rootReducer').default;
//         store.replaceReducer(newRootReducer);
//     });
// }
