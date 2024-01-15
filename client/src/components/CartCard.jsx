import React from 'react';
import { Box, Text, Button, Flex, Image, IconButton } from '@chakra-ui/react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import replaceImageUrl from '~/utils/replaceImage';

const CartCard = ({ product, onRemove, onUpdateQuantity }) => {
    const { _id, name, price, quantity, images, store } = product;
    const productImage = replaceImageUrl(images[0], 'http://localhost:5000');

    return (
        <Flex borderWidth="1px" borderRadius="lg" p="4" mb="4" alignItems="center">
            <Image src={productImage} alt={name} boxSize="120px" objectFit="cover" mr="4" />

            <Box>
                <Text fontSize="lg" fontWeight="bold">
                    {name}
                </Text>
                <Text fontSize="md">Price: ${price}</Text>
                <Text fontSize="md" color="teal.500">
                    Shop: {store.name}
                </Text>
                <Flex alignItems="center" mt="2">
                    <IconButton
                        colorScheme="red"
                        aria-label="Decrease Quantity"
                        icon={<FaMinus />}
                        onClick={() => onUpdateQuantity(_id, quantity - 1)}
                        disabled={quantity === 1}
                        mr="2"
                        size="sm"
                    />
                    <Text fontSize="md" mx="2">
                        {quantity}
                    </Text>
                    <IconButton
                        colorScheme="green"
                        aria-label="Increase Quantity"
                        icon={<FaPlus />}
                        onClick={() => onUpdateQuantity(_id, quantity + 1)}
                        mr="2"
                        size="sm"
                    />
                    <Button colorScheme="blue" size="sm" onClick={() => onRemove(_id)}>
                        Remove
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default CartCard;
