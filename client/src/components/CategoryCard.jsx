import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { logo } from '~/assets/images';

const CategoryCard = ({ icon = logo, name, active }) => {
    return (
        <Box
            minW={200}
            flexShrink={0}
            p={4}
            bg={active ? 'teal.200' : 'white'}
            borderRadius="md"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            _hover={{ cursor: 'pointer' }}
            mx={4}
        >
            <Flex alignItems="center">
                <Image src={icon} alt={name} boxSize="25px" objectFit="cover" mx="auto" />
                <Text ml={2} fontWeight={active ? 'bold' : 'normal'} color={active ? 'teal.800' : 'teal.500'}>
                    {name}
                </Text>
            </Flex>
        </Box>
    );
};

export default CategoryCard;
