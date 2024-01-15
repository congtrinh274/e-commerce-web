import React, { useState, useEffect } from 'react';
import { Box, Text, Select, SimpleGrid, Button, Stack, Flex } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from '~/components/ProductCard';
import axios from 'axios';

const ProductContainer = ({ products }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const [categories, setCategories] = useState([]);

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

    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setSelectedCategory(selectedCategory);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const paginatedProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    const filteredProducts = paginatedProducts.filter((product) => {
        return selectedCategory === 'all' || product.category === selectedCategory;
    });

    return (
        <Box p={4}>
            <Stack direction="row" justify="space-between" align="center" mb={4}>
                <Flex align="center">
                    <Text fontSize="xl" fontWeight="bold">
                        All Products
                    </Text>
                </Flex>
                <Select
                    placeholder="Select category"
                    w="200px"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="all">All</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </Select>
            </Stack>
            <SimpleGrid columns={4} spacing={5}>
                {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </SimpleGrid>
            <Box mt={4} textAlign="center">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <Button
                        key={index}
                        size="sm"
                        colorScheme={currentPage === index + 1 ? 'teal' : 'gray'}
                        onClick={() => handlePageChange(index + 1)}
                        mx={1}
                    >
                        {index + 1}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default ProductContainer;
