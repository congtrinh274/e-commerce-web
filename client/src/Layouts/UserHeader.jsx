import React, { useEffect, useState } from 'react';
import {
    Flex,
    Box,
    Input,
    IconButton,
    Link,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    Image,
} from '@chakra-ui/react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import config from '~/config';
import { logo } from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import { useCart } from '~/contexts/cartContext';

function UserHeader() {
    const navigate = useNavigate();
    const { auth } = JSON.parse(localStorage.getItem('appState')) || {};
    const store = JSON.parse(localStorage.getItem('store')) || {};
    const { cart } = useCart();

    const handleLogout = () => {
        localStorage.removeItem('appState');
        localStorage.removeItem('store');
        navigate('/');
    };

    return (
        <Flex p={4} bg="teal.600" color="white" align="center" justify="space-between" pl="24" pr="24">
            <Box>
                <Link href="/" fontSize="xl" fontWeight="bold">
                    <Flex alignItems="center">
                        <Image src={logo} w={50} height={50} mr={4} />
                        <Text>E-commerce</Text>
                    </Flex>
                </Link>
            </Box>
            <Box ml={4} position="relative">
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
                <Flex>
                    <Box position="relative" onClick={() => navigate('/cart')}>
                        <IconButton
                            aria-label="Shopping Cart"
                            icon={<FaShoppingCart />}
                            size="md"
                            colorScheme="whiteAlpha"
                            mr={8}
                        ></IconButton>
                        {cart.length > 0 && (
                            <Box
                                position="absolute"
                                top="-8px"
                                right="25px"
                                bg="red"
                                color="white"
                                borderRadius="50%"
                                padding="2px 6px"
                                fontSize="xs"
                            >
                                {cart.length}
                            </Box>
                        )}
                    </Box>
                    {auth && auth.user.username ? (
                        <Menu>
                            <MenuButton as={Flex} align="center" cursor="pointer">
                                <Flex alignItems="center">
                                    <Text mr={2}>{auth.user.username}</Text>
                                    <Avatar size="sm" name={auth.user.username} src={auth.user.imageURL} />
                                </Flex>
                            </MenuButton>
                            <MenuList
                                border="1px solid teal.500"
                                boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                                borderRadius="md"
                                bg="white"
                                color="teal.500"
                            >
                                <MenuItem _hover={{ bg: 'teal.100' }}>Profile</MenuItem>
                                <MenuItem _hover={{ bg: 'teal.100' }}>Favorites</MenuItem>
                                <MenuItem _hover={{ bg: 'teal.100' }}>Your Orders</MenuItem>
                                {store._id || auth.user.store ? (
                                    <MenuItem _hover={{ bg: 'teal.100' }} onClick={() => navigate('/store/home-store')}>
                                        Your shop
                                    </MenuItem>
                                ) : (
                                    <MenuItem
                                        _hover={{ bg: 'teal.100' }}
                                        onClick={() => {
                                            navigate('/store/register');
                                        }}
                                    >
                                        Become a seller?
                                    </MenuItem>
                                )}
                                <MenuItem _hover={{ bg: 'teal.100' }} onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Link href={config.routes.login} fontSize="lg" color="white">
                            Login
                        </Link>
                    )}
                </Flex>
            </Box>
        </Flex>
    );
}

export default UserHeader;
