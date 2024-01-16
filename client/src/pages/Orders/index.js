import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td, Text, Badge, Stack, Image, VStack } from '@chakra-ui/react';

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
                        <Th>Quantity</Th>
                        <Th>Total Price</Th>
                        <Th>Order Date</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orders.map((order) => (
                        <Tr key={order._id}>
                            <Td>{order._id}</Td>
                            <Td>
                                {order.products.map((product) => (
                                    <Stack key={product._id} direction="row" spacing={2}>
                                        <Image
                                            src={`http://localhost:5000/${product.images[0]}`}
                                            alt={product.name}
                                            boxSize="40px"
                                        />
                                        <Text>{product.name}</Text>
                                    </Stack>
                                ))}
                            </Td>
                            <Td>{order.seller.name}</Td>
                            <Td>{order.products.length}</Td>
                            <Td>${order.totalAmount}</Td>
                            <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                            <Td>
                                <Badge colorScheme={order.status === 'pending' ? 'orange' : 'green'}>
                                    {order.status}
                                </Badge>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </VStack>
    );
};

export default Orders;
