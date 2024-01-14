import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productSlices = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        products: [],
        error: false,
    },

    reducers: {
        LOADING: (state, action) => {
            state.isLoading = true;
        },
        GET_PRODUCTS: (state, action) => {
            state.isLoading = false;
            state.products = [...action.payload];
        },
        ADD_PRODUCT: (state, action) => {
            state.isLoading = false;
            state.products = [...state.products, action.payload.data];
        },
    },
});

export const { state, ADD_PRODUCT, GET_PRODUCTS } = productSlices.actions;

export const getAllProducts = () => async (dispatch) => {
    try {
        const response = await axios.get('http://192.168.0.104:5000/products', {
            timeout: 3000,
        });
        dispatch(GET_PRODUCTS(response.data));
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.log('Request timed out');
            throw new Error('Request timeout');
        } else {
            console.log('Error:', error);
            throw error.response.data.error;
        }
    }
};

export const addProduct =
    (name, description, price, countInStock, categoryId, thumbnail, accessToken) => async (dispatch) => {
        const data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('price', price);
        data.append('countInStock', countInStock);
        data.append('categoryId', categoryId);
        data.append('images', thumbnail);
        try {
            const response = await axios.post('http://192.168.0.104:5000/products/create', data, {
                timeout: 3000,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    x_authorization: accessToken,
                },
            });
            console.log(response.data);
            dispatch(ADD_PRODUCT(response.data));
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                console.log('Request timed out');
                throw new Error('Request timeout');
            } else {
                console.log('Error:', error);
                throw error.response.data.error;
            }
        }
    };

export default productSlices.reducer;
