// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        accessToken: null,
        isLoading: false,
        error: false,
        refreshToken: null,
    },
    reducers: {
        AUTH_LOADING: (state, action) => {
            state.isLoading = true;
        },
        LOGIN: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.data;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        REGISTER: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.data;
        },
        AUTH_FAILURE: (state, action) => {
            state.isLoading = false;
            state.error = true;
        },
    },
});

export const { AUTH_LOADING, LOGIN, REGISTER, AUTH_FAILURE, AUTH_RELOAD } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
    dispatch(AUTH_LOADING());
    try {
        const response = await axios.post(
            'http://192.168.0.104:5000/auth/login',
            {
                email,
                password,
            },
            {
                timeout: 3000,
            },
        );

        dispatch(LOGIN(response.data));
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.log('Request timed out');
            dispatch(AUTH_FAILURE());
            throw new Error('Request timeout');
        } else {
            console.log('Error:', error);
            dispatch(AUTH_FAILURE());
            throw error.response.data.error;
        }
    }
};

export const register = (username, email, password) => async (dispatch) => {
    dispatch(AUTH_LOADING());
    try {
        const response = await axios.post(
            'http://192.168.0.104:5000/auth/register',
            {
                username,
                email,
                password,
            },
            {
                timeout: 3000,
            },
        );

        dispatch(REGISTER(response.data));
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.log('Request timed out');
            dispatch(AUTH_FAILURE());
            throw new Error('Request timeout');
        } else {
            console.log('Error:', error);
            dispatch(AUTH_FAILURE());
            throw error.response.data.error;
        }
    }
};

export default authSlice.reducer;
