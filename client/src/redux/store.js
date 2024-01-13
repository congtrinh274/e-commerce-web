import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlices';
import storeReducer from './features/storeSlices';
import productReducer from './features/productSlices';

const store = configureStore({
    reducer: {
        auth: authReducer,
        store: storeReducer,
        products: productReducer,
    },
});

export default store;
