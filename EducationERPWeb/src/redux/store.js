import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import {persistReducer, persistStore} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import {api} from '../services/baseQuery';
import dashBoardSlice from './slices/dashBoardSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const rootReducer = combineReducers({
  userInfo: userReducer,
  dashboardInfo: dashBoardSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});
export const persistor = persistStore(store);
