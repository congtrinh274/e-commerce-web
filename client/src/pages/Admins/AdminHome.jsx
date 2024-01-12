import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Flex,
    Spacer,
    List,
    ListItem,
    Link as ChakraLink,
    Avatar,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@chakra-ui/react';
import config from '~/config';

const AdminHome = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [adminInfo, setAdminInfo] = useState({
        name: 'Admin Name',
        email: 'admin@example.com',
    });

    const handleUpdateInfo = () => {
        // Logic to update admin info
        // For simplicity, let's just toggle between two predefined names
        setAdminInfo((prevInfo) => ({
            ...prevInfo,
            name: prevInfo.name === 'Admin Name' ? 'Updated Admin' : 'Admin Name',
        }));
        onClose();
    };

    return (
        <Box p={6}>
            <Flex align="center">
                <Avatar size="md" name={adminInfo.name} />
                <Box ml={4}>
                    <Text>{adminInfo.email}</Text>
                    <ChakraLink fontSize="sm" color="teal.500" onClick={onOpen}>
                        Update Info
                    </ChakraLink>
                </Box>
                <Spacer />
                <List display="flex">
                    <ListItem>
                        <Link to={config.routes.admin}>
                            <ChakraLink fontSize="md" mr={4}>
                                Dashboard
                            </ChakraLink>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to={config.routes.categoriesManager}>
                            <ChakraLink fontSize="md" mr={4}>
                                Category Manager
                            </ChakraLink>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to={config.routes.brandsManager}>
                            <ChakraLink fontSize="md" mr={4}>
                                Brand Manager
                            </ChakraLink>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to={config.routes.usersManager}>
                            <ChakraLink fontSize="md">User Manager</ChakraLink>
                        </Link>
                    </ListItem>
                </List>
            </Flex>

            {/* Update Info Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Admin Info</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Your form fields for updating admin info go here */}
                        <Text mb={4}>Update admin information form goes here...</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={handleUpdateInfo}>
                            Save Changes
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default AdminHome;
