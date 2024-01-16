import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Select, Heading, Stack, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderManager = () => {
    const store = useSelector((state) => state.store.store);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://192.168.0.104:5000/orders/seller?storeId=${store._id}`, {
                timeout: 3000,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    x_authorization: accessToken,
                },
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error.message);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, [store._id, accessToken]); // Include store._id and accessToken in the dependency array

    const handleUpdate = async (orderId, newStatus) => {
        try {
            // Call the API to update the order status
            await axios.post(
                'http://192.168.0.104:5000/orders/update',
                {
                    orderId,
                    newStatus,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        x_authorization: accessToken,
                    },
                },
            );

            toast.success('Update successfully!', { position: 'top-right' });
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error.message);
        }
    };

    return (
        <Box p={4}>
            <Heading fontSize={30} mb={4}>
                Order Manager
            </Heading>
            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        <Th>ID Order</Th>
                        <Th>Buyer Name</Th>
                        <Th>Phone Number</Th>
                        <Th>Products</Th>
                        <Th>Quantity</Th>
                        <Th>Price</Th>
                        <Th>Address</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orders.map((order) => (
                        <Tr key={order._id}>
                            <Td>{order._id}</Td>
                            <Td>{order.buyer.username}</Td>
                            <Td>{order.phoneNumber}</Td>
                            <Td>
                                {order.products.map((product) => (
                                    <Stack key={product._id} direction="row" spacing={2}>
                                        <Image
                                            src={`http://192.168.0.104:5000/${product.images[0]}`}
                                            alt={product.name}
                                            boxSize="40px"
                                        />
                                        <Text>{product.name}</Text>
                                    </Stack>
                                ))}
                            </Td>
                            <Td>{order.products.length}</Td>
                            <Td>${order.totalAmount}</Td>
                            <Td>{order.address}</Td>
                            <Td>
                                <Select
                                    defaultValue={order.status}
                                    variant="outline"
                                    onChange={(e) => handleUpdate(order._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </Select>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default OrderManager;
