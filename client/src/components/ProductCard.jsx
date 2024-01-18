import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Button, Flex, IconButton } from '@chakra-ui/react';
import { FaStar, FaHeart } from 'react-icons/fa';
import replaceImageUrl from '~/utils/replaceImage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '~/contexts/cartContext';

const ProductCard = ({ product, sellerMode }) => {
    const navigate = useNavigate();
    const productImage = replaceImageUrl(product.images[0], 'http://localhost:5000');
    const { dispatch } = useCart();
    const [isInWishlist, setIsInWishlist] = useState(false);

    const loadWishlistStatus = () => {
        const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        return existingWishlist.some((item) => item._id === product._id);
    };

    useEffect(() => {
        setIsInWishlist(loadWishlistStatus());
    }, []); // Chỉ chạy một lần khi component được render

    const handleGetProductDetail = () => {
        navigate('/products/product-detail', { state: { product } });
    };

    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = existingCart.findIndex((item) => item._id === product._id);

        if (existingProductIndex !== -1) {
            existingCart[existingProductIndex].quantity += 1;
        } else {
            existingCart.push({ ...product, quantity: 1 });
        }

        // Replace localStorage update with dispatch function from useCart context
        dispatch({ type: 'UPDATE_CART', payload: existingCart });
        localStorage.setItem('cart', JSON.stringify(existingCart));

        toast.success('Product added to cart!', { position: 'top-left' });
    };

    const handleToggleWishlist = () => {
        const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        if (isInWishlist) {
            // Remove from wishlist
            const updatedWishlist = existingWishlist.filter((item) => item._id !== product._id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsInWishlist(false);
            toast.info('Product removed from wishlist!', { position: 'top-left' });
        } else {
            // Add to wishlist
            existingWishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
            setIsInWishlist(true);
            toast.success('Product added to wishlist!', { position: 'top-left' });
        }
    };

    return (
        <Box
            minW={300}
            maxW={250}
            minH={500}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            mr={5}
            ml={5}
        >
            <Box onClick={handleGetProductDetail}>
                <Image src={productImage} boxSize="200px" objectFit="cover" mx="auto" mt="4" />
                <Box p="4" flexGrow={1}>
                    <Flex direction="column" justifyContent="space-between" h="100%" mt={12}>
                        <Flex align="baseline" justifyContent="space-between">
                            <Text fontSize="md" fontWeight="semibold" mr={2}>
                                {product.name}
                            </Text>
                            <Text color="gray.500">{`$${product.price}`}</Text>
                        </Flex>
                        <Text mt={2} color="gray.600">
                            {product.description}
                        </Text>
                        <Flex align="center" mt={2}>
                            <Text fontSize="md" color="gray.600" mr={2}>
                                Ratings:
                            </Text>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <FaStar key={index} color={index < product.ratings ? 'teal' : 'gray.300'} />
                            ))}
                        </Flex>
                        <Flex mt="2" color="teal.500" alignItems="center">
                            Shop:{' '}
                            <Text color="red" ml={2}>
                                {product.store.name}
                            </Text>
                        </Flex>
                        {product.quantity && (
                            <Flex mt="2" color="teal.500" alignItems="center">
                                Orders quantity:{' '}
                                <Text color="red" ml={2}>
                                    {product.quantity}
                                </Text>
                            </Flex>
                        )}
                    </Flex>
                </Box>
            </Box>
            <Flex justifyContent="space-between" alignItems="center" mt={2} padding={4}>
                <IconButton
                    icon={<FaHeart size="0.6rem" />}
                    aria-label="Add to Favorites"
                    onClick={handleToggleWishlist}
                    colorScheme={isInWishlist ? 'red' : 'gray'}
                />
                {sellerMode ? (
                    <Button colorScheme="teal" onClick={() => {}} width="50%">
                        Edit
                    </Button>
                ) : (
                    <Button colorScheme="teal" onClick={handleAddToCart} width="50%">
                        Add to Cart
                    </Button>
                )}
            </Flex>
        </Box>
    );
};

export default ProductCard;
