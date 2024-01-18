import React from 'react';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import ProductCard from '~/components/ProductCard';

const Wishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    return (
        <Box p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Wishlist
            </Text>
            {wishlist.length === 0 ? (
                <Text>No items in the wishlist</Text>
            ) : (
                <SimpleGrid columns={4} spacing={5}>
                    {wishlist.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default Wishlist;
