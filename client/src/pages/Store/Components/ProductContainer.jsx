import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Select,
    SimpleGrid,
    Button,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    Textarea,
    Flex,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from '~/components/ProductCard';
import axios from 'axios';
import ImageUploader from '~/components/ImageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '~/redux/features/productSlices';

const ProductContainer = ({ sellerMode = true }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);
    const store = useSelector((state) => state.store.store);
    const products = store.products || [];
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedModalCategory, setSelectedModalCategory] = useState('');
    const productsPerPage = 8;

    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        countInStock: '',
        image: null,
    });

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

    const filteredProducts =
        products &&
        products.filter((product) => {
            return selectedCategory === 'all' || product.category === selectedCategory;
        });

    const totalProducts = filteredProducts && filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleModalCategoryChange = (event) => {
        setSelectedModalCategory(event.target.value);
    };

    const paginatedProducts =
        filteredProducts && filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (file) => {
        setNewProduct((prev) => ({ ...prev, image: file }));
    };

    const handleAddNewProduct = async () => {
        try {
            const category = categories.filter((category) => category.name === selectedModalCategory);
            const name = newProduct.name;
            const description = newProduct.description;
            const price = newProduct.price;
            const countInStock = newProduct.countInStock;
            const categoryId = category[0]._id;
            const thumbnail = newProduct.image;
            console.log(thumbnail);
            await dispatch(addProduct(name, description, price, countInStock, categoryId, thumbnail, accessToken));
            toast.success('Notify', 'Add new product successfully!');
        } catch (error) {
            if (error.message === 'Request timeout') {
                toast.error(error.message || 'Đã xảy ra lỗi!', { position: 'top-right' });
            } else {
                toast.error(error, { position: 'top-right' });
            }
        }
        onClose();
    };

    return (
        <Box p={4}>
            <Stack direction="row" justify="space-between" align="center" mb={4}>
                <Flex align="center">
                    <Text fontSize="xl" fontWeight="bold">
                        Products Manager
                    </Text>
                    <Button colorScheme="teal" ml={4} onClick={onOpen}>
                        Add New
                    </Button>
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
                {paginatedProducts &&
                    paginatedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} sellerMode={sellerMode} />
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

            {/* Add New Product Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={handleNewProductChange}
                            mb={3}
                        />
                        <Textarea
                            placeholder="Product Description"
                            name="description"
                            value={newProduct.description}
                            onChange={handleNewProductChange}
                            mb={3}
                        />
                        <Input
                            type="text"
                            placeholder="Product Price"
                            name="price"
                            value={newProduct.price}
                            onChange={handleNewProductChange}
                            mb={3}
                        />
                        <Input
                            type="text"
                            placeholder="Count in Stock"
                            name="countInStock"
                            value={newProduct.countInStock}
                            onChange={handleNewProductChange}
                            mb={3}
                        />
                        <Select
                            placeholder="Select category"
                            w="100%"
                            value={selectedModalCategory}
                            onChange={handleModalCategoryChange}
                            mb={3}
                        >
                            {categories.map((category) => (
                                <option key={category._id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </Select>
                        <ImageUploader onUpload={handleImageUpload} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={handleAddNewProduct}>
                            Add Product
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductContainer;
