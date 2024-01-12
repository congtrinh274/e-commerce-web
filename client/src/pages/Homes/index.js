import React from 'react';
import { Flex, Box, Input, IconButton, Link } from '@chakra-ui/react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa'; // Thêm icon tìm kiếm
import config from '~/config';

function Home() {
    return (
        <Flex p={4} bg="teal.600" color="white" align="center" justify="space-between" pl="24" pr="24">
            <Box>
                <Link href="/" fontSize="xl" fontWeight="bold">
                    YourLogo
                </Link>
            </Box>
            <Box ml={4}>
                <Input
                    type="text"
                    placeholder="Search"
                    bg="white"
                    color="teal.500"
                    width="lg"
                    _focus={{ boxShadow: 'none' }}
                />
                <IconButton
                    icon={<FaSearch />}
                    color="teal.500"
                    aria-label="Search Icon"
                    ml={-8}
                    position="absolute"
                    zIndex="1"
                />
            </Box>
            <Box ml={4}>
                <IconButton
                    aria-label="Shopping Cart"
                    icon={<FaShoppingCart />}
                    size="md"
                    colorScheme="whiteAlpha"
                    mr={8}
                />
                <Link href={config.routes.login} fontSize="lg" color="white">
                    Login
                </Link>
            </Box>
        </Flex>
    );
}

export default Home;
