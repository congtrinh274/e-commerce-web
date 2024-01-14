import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const storeSlices = createSlice({
    name: 'store',
    initialState: {
        isLoading: false,
        store: {},
        error: false,
    },
    reducers: {
        REGISTER_LOADING: (state, action) => {
            state.isLoading = true;
        },
        REGISTER: (state, action) => {
            state.isLoading = false;
            state.store = action.payload.data;
            localStorage.setItem('store', JSON.stringify(action.payload.data));
        },
        REGISTER_FAILURE: (state, action) => {
            state.isLoading = false;
            state.error = true;
        },
        GET_STORE: (state, action) => {
            state.isLoading = false;
            state.store = action.payload.data;
        },
        CREATE_CATEGORY: (state, action) => {
            state.isLoading = false;
            state.store = { ...state.store, ...state.store.categories.push(action.payload.data) };
        },
    },
});

export const { REGISTER_LOADING, REGISTER, REGISTER_FAILURE, GET_STORE, CREATE_CATEGORY } = storeSlices.actions;

export const registerStore =
    (shopName, bio = '', phoneNumber, fullAddress, accessToken) =>
    async (dispatch) => {
        dispatch(REGISTER_LOADING());
        try {
            const response = await axios.post(
                'http://192.168.0.104:5000/store/create',
                {
                    name: shopName,
                    bio,
                    phoneNumber,
                    shedAddress: fullAddress,
                },
                {
                    timeout: 3000,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        x_authorization: accessToken,
                    },
                },
            );

            dispatch(REGISTER(response.data));
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                console.log('Request timed out');
                dispatch(REGISTER_FAILURE());
                throw new Error('Request timeout');
            } else {
                console.log('Error:', error);
                dispatch(REGISTER_FAILURE());
                throw error.response.data.error;
            }
        }
    };

export const createCategory = (title, description, iconUri, accessToken) => async (dispatch) => {
    const data = new FormData();
    data.append('name', title);
    data.append('description', description);
    data.append('icon', {
        uri: iconUri,
        type: 'image/png',
        name: 'category-icon.jpg',
    });

    try {
        const response = await axios.post('http://192.168.0.104:5000/category/create', data, {
            timeout: 3000,
            headers: {
                'Content-Type': 'multipart/form-data',
                x_authorization: accessToken,
            },
        });

        dispatch(CREATE_CATEGORY(response.data));
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

export const getStore = (userId, accessToken) => async (dispatch) => {
    try {
        const response = await axios.get(`http://192.168.0.104:5000/store/user?userId=${userId}`, {
            timeout: 3000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                x_authorization: accessToken,
            },
        });

        dispatch(GET_STORE(response.data));
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

export default storeSlices.reducer;
