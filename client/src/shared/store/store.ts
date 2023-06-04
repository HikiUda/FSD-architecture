import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from 'shared/store/userStore';

const rootReducer = combineReducers({
   user: userReducer,
});

export const setupStore = () => configureStore({ reducer: rootReducer });

export type AppStore = ReturnType<typeof setupStore>;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = AppStore['dispatch'];
