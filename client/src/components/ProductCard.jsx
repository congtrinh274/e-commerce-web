import React from 'react';
import { Box, Image, Text, Button, Flex, IconButton } from '@chakra-ui/react';
import { checkIcon } from '~/assets/images';
import { FaHeart } from 'react-icons/fa';
import replaceImageUrl from '~/utils/replaceImage';

const ProductCard = ({ product, onAddToCart }) => {
    // const { name, description, price, image } = product;
    const productImage = replaceImageUrl(product.images[0], 'http://localhost:5000');

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
                    <Text mt={2} color="gray.600">
                        Ratings: {product.ratings} / 5
                    </Text>
                    <Flex mt="2" color="teal.500" alignItems="center">
                        Shop:{' '}
                        <Text color="red" ml={2}>
                            {product.store.name}
                        </Text>
                    </Flex>
                    <Flex justifyContent="space-between" alignItems="center" mt={10}>
                        <IconButton
                            icon={<FaHeart size="0.6rem" />}
                            aria-label="Add to Favorites"
                            onClick={() => {
                                // Xử lí logic khi click vào hình trái tim
                            }}
                            colorScheme="red"
                        />
                        <Button colorScheme="teal" onClick={onAddToCart} width="50%">
                            Add to Cart
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default ProductCard;
