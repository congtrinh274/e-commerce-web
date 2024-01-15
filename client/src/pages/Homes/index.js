import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import ProductSlide from '~/components/ProductSlide';
import ProductContainer from '~/components/ProductContainer';

function Home() {
    const auth = useSelector((state) => state.auth);
    const productsData = useSelector((state) => state.products.products);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([...productsData]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get('http://192.168.0.104:5000/category');
                setCategories(response.data);
            } catch (error) {
                console.error('Error get categories:', error);
            }
        };
        getCategories();
    }, []);

    return (
        <>
            <Flex justifyContent="space-between" mb={2} w={500} mx="auto">
                <Text fontSize="l" fontWeight="bold" cursor="pointer" color="teal">
                    Hot Deal
                </Text>
                <Text fontSize="l" fontWeight="bold" cursor="pointer" color="teal">
                    Most Searched
                </Text>
                <Text fontSize="l" fontWeight="bold" cursor="pointer" color="teal">
                    All Products
                </Text>
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
                            <MenuItem key={category._id}>{category.name}</MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </Flex>
            <ProductSlide products={products} heading="Hot Deal" />
            <ProductSlide products={products} heading="Most Searched" />
            <ProductContainer products={productsData} />
        </>
    );
}

export default Home;
