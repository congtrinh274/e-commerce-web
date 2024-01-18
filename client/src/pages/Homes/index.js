import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Flex, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link } from 'react-scroll';
import ProductSlide from '~/components/ProductSlide';
import ProductContainer from '~/components/ProductContainer';

function Home() {
    const productsData = useSelector((state) => state.products.products);
    const [categories, setCategories] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get('http://192.168.0.104:5000/category');
                setCategories(response.data);
            } catch (error) {
                console.error('Error get categories:', error);
            }
        };

        const getAllOrders = async () => {
            try {
                const response = await axios.get('http://192.168.0.104:5000/orders/all');
                setAllOrders(response.data);
            } catch (error) {
                console.error('Error getting all orders:', error);
            }
        };

        getCategories();
        getAllOrders();
    }, []);

    useEffect(() => {
        // Lọc ra các đơn hàng có trạng thái là "completed"
        const completedOrders = allOrders.filter((order) => order.status === 'completed');

        // Tính toán số lượng đặt hàng của từng sản phẩm từ các đơn hàng "completed"
        const productQuantities = {};
        completedOrders.forEach((order) => {
            order.products.forEach((productData) => {
                const productId = productData.product._id;
                const quantity = productData.quantity;
                if (productQuantities[productId]) {
                    productQuantities[productId] += quantity;
                } else {
                    productQuantities[productId] = quantity;
                }
            });
        });

        // Sắp xếp sản phẩm theo số lượng đặt hàng giảm dần
        const sortedProducts = Object.keys(productQuantities).sort(
            (a, b) => productQuantities[b] - productQuantities[a],
        );

        // Chọn 5 sản phẩm đầu tiên từ danh sách đã sắp xếp
        const topProducts = sortedProducts.slice(0, 5);

        // Lấy thông tin chi tiết của các sản phẩm và số lượng đặt hàng
        const bestProductsDetails = topProducts.map((productId) => {
            const product = productsData.find((product) => product._id === productId);
            const quantity = productQuantities[productId];
            return { ...product, quantity };
        });

        setBestProducts(bestProductsDetails);
    }, [allOrders, productsData]);

    return (
        <>
            <Flex justifyContent="space-between" mb={2} w={500} mx="auto">
                <Link to="hotDeals" smooth duration={500}>
                    <Text fontSize="l" fontWeight="bold" cursor="pointer" color="teal">
                        Hot Deal
                    </Text>
                </Link>
                <Link to="allProducts" smooth duration={500}>
                    <Text fontSize="l" fontWeight="bold" cursor="pointer" color="teal">
                        All Products
                    </Text>
                </Link>
                <Menu>
                    <MenuButton
                        as={Text}
                        fontSize="l"
                        fontWeight="bold"
                        cursor="pointer"
                        color="teal"
                        _hover={{ bg: 'transparent' }}
                    >
                        Categories
                    </MenuButton>
                    <MenuList>
                        {categories.map((category) => (
                            <Link key={category._id} to={category.name} smooth duration={500}>
                                <MenuItem>{category.name}</MenuItem>
                            </Link>
                        ))}
                    </MenuList>
                </Menu>
            </Flex>
            <ProductSlide products={bestProducts} heading="Most Ordered Products" id="best Product" />
            <ProductContainer products={productsData} id="allProducts" />
        </>
    );
}

export default Home;
