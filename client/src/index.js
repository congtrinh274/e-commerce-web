import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '~/redux/store';
import { ToastContainer } from 'react-toastify';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ChakraProvider>
            <App />
            <ToastContainer />
        </ChakraProvider>
    </Provider>,
);
