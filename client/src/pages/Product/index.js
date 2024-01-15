import React from 'react';
import { Box, Image, Text, Button, Flex } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import replaceImageUrl from '~/utils/replaceImage';

const ProductDetail = ({ onAddToCart }) => {
    const {
        state: { product },
    } = useLocation();
    const { name, description, price, ratings, shop } = product;
    const productImage = replaceImageUrl(product.images[0], 'http://localhost:5000');

    return (
        <Box p={4} maxW="800px" mx="auto" mt={8}>
            <Flex>
                <Image src={productImage} alt={name} boxSize="300px" objectFit="cover" mr={8} />
                <Box>
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                        {name}
                    </Text>
                    <Text fontSize="md" color="gray.600" mb={4}>
                        {description}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Price: ${price}
                    </Text>
                    <Flex align="center" mb={4}>
                        <Text fontSize="md" color="gray.600" mr={2}>
                            Ratings:
                        </Text>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <FaStar key={index} color={index < ratings ? 'teal' : 'gray.300'} />
                        ))}
                    </Flex>
                    <Flex mt="2" color="teal.500" alignItems="center">
                        Shop:{' '}
                        <Text color="red" ml={2}>
                            {product.store.name}
                        </Text>
                    </Flex>
                    <Button colorScheme="teal" onClick={onAddToCart} mt={4}>
                        Add to Cart
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
};

export default ProductDetail;
