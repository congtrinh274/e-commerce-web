import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Select,
    SimpleGrid,
    Button,
    Stack,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from '~/components/ProductCard';
import axios from 'axios';

const ProductContainer = ({ products, id }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedFilter, setSelectedFilter] = useState('all');
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
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
        setCurrentPage(1);
    };

    const handleFilterChange = (value) => {
        let selectedFilter = 'all'; // Giá trị mặc định khi không có filter nào được chọn

        switch (value) {
            case 'lowToHigh':
                selectedFilter = 'Low to High';
                break;
            case 'highToLow':
                selectedFilter = 'High to Low';
                break;
            case 'newToOld':
                selectedFilter = 'New to Old';
                break;
            case 'oldToNew':
                selectedFilter = 'Old to New';
                break;
            default:
                break;
        }

        setSelectedFilter(selectedFilter);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const applyFilter = (product) => {
        switch (selectedFilter) {
            case 'Low to High':
                return product.price;
            case 'High to Low':
                return -product.price;
            case 'New to Old':
                return -new Date(product.createdAt);
            case 'Old to New':
                return new Date(product.createdAt);
            default:
                return 0; // No filter
        }
    };

    const filteredProducts = products
        .filter((product) => selectedCategory === 'all' || product.category === selectedCategory)
        .sort((a, b) => applyFilter(a) - applyFilter(b));

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage,
    );

    return (
        <Box p={4} id={id}>
            <Stack direction="row" justify="space-between" align="center" mb={4}>
                <Flex align="center">
                    <Text fontSize="xl" fontWeight="bold">
                        All Products
                    </Text>
                </Flex>
                <Flex>
                    <Select
                        placeholder="Select category"
                        w="200px"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        mr={4}
                    >
                        <option value="all">All</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </Select>
                    {/* Thêm MenuList */}
                    <Menu>
                        <MenuButton as={Button} colorScheme="teal">
                            {selectedFilter === 'all' ? 'All Filters' : selectedFilter}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => handleFilterChange('lowToHigh')}>Low to High</MenuItem>
                            <MenuItem onClick={() => handleFilterChange('highToLow')}>High to Low</MenuItem>
                            <MenuItem onClick={() => handleFilterChange('newToOld')}>New to Old</MenuItem>
                            <MenuItem onClick={() => handleFilterChange('oldToNew')}>Old to New</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Stack>
            <SimpleGrid columns={4} spacing={5}>
                {paginatedProducts.map((product) => (
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
