import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import adminAuthReducer from './adminAuthSlice';

const authPersistConfig = {
    key: 'auth',
    storage,
};

const adminAuthPersistConfig = {
    key: 'adminAuth',
    storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedAdminAuthReducer = persistReducer(adminAuthPersistConfig, adminAuthReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        adminAuth: persistedAdminAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;