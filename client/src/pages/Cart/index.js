import React, { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
    Select,
} from '@chakra-ui/react';
import { useCart } from '~/contexts/cartContext';
import CartCard from '~/components/CartCard';
import StripeForm from '~/components/StripeForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(
    'pk_test_51OYliSH9BeeFsG5ZXk52tnALqqch9FAjY5l8hFRycbZdHFAg1EWinWgBu9vxIlhtWnX2towSjJYQUjNvsrgVymHD00rZNrnmf6',
);

const Cart = () => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const { cart, dispatch } = useCart();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [orderInfo, setOrderInfo] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        paymentMethod: 'cashOnDelivery',
    });

    const handleRemove = (productId) => {
        const updatedCart = cart.filter((product) => product._id !== productId);
        dispatch({ type: 'UPDATE_CART', payload: updatedCart });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        const updatedCart = cart.map((product) =>
            product._id === productId ? { ...product, quantity: newQuantity } : product,
        );
        dispatch({ type: 'UPDATE_CART', payload: updatedCart });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleOpenOrderModal = () => {
        onOpen();
    };

    const handleConfirmOrder = async () => {
        try {
            const response = await axios.post(
                'http://192.168.0.104:5000/orders/create',
                {
                    buyer: auth.user._id,
                    products: cart,
                    address: orderInfo.address,
                    phoneNumber: orderInfo.phoneNumber,
                    paymentMethod: orderInfo.paymentMethod,
                },
                {
                    timeout: 3000,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        x_authorization: auth.accessToken,
                    },
                },
            );
            localStorage.removeItem('cart');
            navigate('/user-orders');
            console.log(response.data);

            onClose();
        } catch (error) {
            console.error('Error creating order:', error.message);
        }
    };

    return (
        <Flex>
            <Box flex="1">
                <Heading mb="4">Shopping Cart</Heading>
                {cart.map((product) => (
                    <CartCard
                        key={product._id}
                        product={product}
                        onRemove={handleRemove}
                        onUpdateQuantity={handleUpdateQuantity}
                    />
                ))}
            </Box>
            <Box w="300px" p="4" borderWidth="1px" borderRadius="lg" ml="4" top="0" maxH={500}>
                <Box>
                    <Heading mb="4" size="md">
                        Summary
                    </Heading>
                    {cart.map((product) => (
                        <Flex key={product._id} justify="space-between" mb="4">
                            <Box>{`${product.name} x${product.quantity}`}</Box>
                            <Box>{`$${product.price * product.quantity}`}</Box>
                        </Flex>
                    ))}
                    <Flex justify="space-between" fontWeight="bold" mt="4">
                        <Box>Total:</Box>
                        <Box>{`$${calculateTotal()}`}</Box>
                    </Flex>
                </Box>
                <Button mt="20" colorScheme="teal" onClick={handleOpenOrderModal} isFullWidth>
                    Order Now
                </Button>
            </Box>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Order Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Full Name"
                            mb="4"
                            value={orderInfo.name}
                            onChange={(e) => setOrderInfo({ ...orderInfo, name: e.target.value })}
                        />
                        <Input
                            placeholder="Address"
                            mb="4"
                            value={orderInfo.address}
                            onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })}
                        />
                        <Input
                            placeholder="Phone Number"
                            mb="4"
                            value={orderInfo.phoneNumber}
                            onChange={(e) => setOrderInfo({ ...orderInfo, phoneNumber: e.target.value })}
                        />
                        <Select
                            placeholder="Select payment method"
                            value={orderInfo.paymentMethod}
                            onChange={(e) => setOrderInfo({ ...orderInfo, paymentMethod: e.target.value })}
                            mb="4"
                        >
                            <option value="cashOnDelivery">Cash on Delivery</option>
                            <option value="onlinePayment">Online Payment</option>
                        </Select>

                        {/* Use the Elements provider here */}
                        <Elements stripe={stripePromise}>
                            {/* Render the StripeForm component */}
                            {orderInfo.paymentMethod === 'onlinePayment' && (
                                <StripeForm handleConfirmOrder={handleConfirmOrder} handleCancelOrder={onClose} />
                            )}
                        </Elements>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={handleConfirmOrder}>
                            Confirm Order
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default Cart;
