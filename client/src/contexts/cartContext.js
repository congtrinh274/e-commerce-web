import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_CART':
            return action.payload;
        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    const updateCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        dispatch({ type: 'UPDATE_CART', payload: storedCart });
    };

    useEffect(() => {
        updateCart();

        const storageListener = (event) => {
            if (event.key === 'cart') {
                updateCart();
            }
        };

        window.addEventListener('storage', storageListener);

        return () => {
            window.removeEventListener('storage', storageListener);
        };
    }, []);

    return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
};

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export { CartProvider, useCart };
