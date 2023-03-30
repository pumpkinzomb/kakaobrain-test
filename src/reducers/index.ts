import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import users from '@/reducers/modules/users';

const rootReducer = combineReducers({
    users,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
