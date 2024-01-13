import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlices';
import storeReducer from './features/storeSlices';
import productReducer from './features/productSlices';

const persistedState = JSON.parse(localStorage.getItem('appState')) || {};

const store = configureStore({
    reducer: {
        auth: authReducer,
        store: storeReducer,
        products: productReducer,
    },
    preloadedState: persistedState,
});

store.subscribe(() => {
    localStorage.setItem('appState', JSON.stringify(store.getState()));
});

export default store;
