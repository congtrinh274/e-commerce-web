import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td, Text, Badge, Stack, Image, VStack, Button } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {
    const auth = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    console.log(orders);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/orders/buyer?buyerId=${auth.user._id}`, {
                    timeout: 3000,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        x_authorization: auth.accessToken,
                    },
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error.message);
            }
        };

        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            // Call the API to update the order status
            await axios.post(
                'http://192.168.0.104:5000/orders/update',
                {
                    orderId,
                    newStatus: 'cancelled',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        x_authorization: auth.accessToken,
                    },
                },
            );

            toast.success('Update successfully!', { position: 'top-right' });
        } catch (error) {
            console.error('Error updating order status:', error.message);
        }
    };

    return (
        <VStack align="flex-start" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">
                Your Orders
            </Text>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Order ID</Th>
                        <Th>Products</Th>
                        <Th>Shop</Th>
                        <Th>Total Price</Th>
                        <Th>Order Date</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orders.map((order) => (
                        <Tr key={order._id}>
                            <Td>{order._id}</Td>
                            <Td>
                                {order.products && order.products.length > 0 ? (
                                    order.products.map((productData) => (
                                        <Stack key={productData._id} direction="row" spacing={2} mb={4}>
                                            <Image
                                                src={`http://localhost:5000/${productData.product.images[0]}`}
                                                alt={productData.product.name}
                                                boxSize="40px"
                                            />
                                            <Text>
                                                {productData.product.name} x{productData.quantity}
                                            </Text>
                                        </Stack>
                                    ))
                                ) : (
                                    <Text>No products</Text>
                                )}
                            </Td>
                            <Td>{order.seller.name}</Td>
                            <Td>${order.totalAmount}</Td>
                            <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                            <Td>
                                <Badge colorScheme={order.status === 'pending' ? 'orange' : 'green'}>
                                    {order.status}
                                </Badge>
                            </Td>
                            <Td>
                                {order.status === 'pending' ? (
                                    <Button size="sm" onClick={() => handleCancelOrder(order._id)} colorScheme="red">
                                        Cancel Order
                                    </Button>
                                ) : (
                                    <Button
                                        size="sm"
                                        onClick={() => handleCancelOrder(order._id)}
                                        colorScheme="red"
                                        isDisabled
                                    >
                                        Cancel Order
                                    </Button>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </VStack>
    );
};

export default Orders;
