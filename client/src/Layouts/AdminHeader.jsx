import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const AdminHeader = () => {
    const user = useSelector((state) => state.auth.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [adminInfo, setAdminInfo] = React.useState({
        name: user.username,
        email: user.email,
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
                <Avatar size="md" src={user.imageURL} name={user.username} borderRadius="full" />
                <Box ml={4}>
                    <Text>{adminInfo.email}</Text>
                    <ChakraLink fontSize="sm" color="teal.500" onClick={onOpen}>
                        Update Info
                    </ChakraLink>
                </Box>
                <Spacer />
                <List display="flex">
                    <ListItem mr={4}>
                        <Link to={config.routes.admin}>Home</Link>
                    </ListItem>
                    <ListItem mr={4}>
                        <Link to={config.routes.categoriesManager}>Category Manager</Link>
                    </ListItem>
                    <ListItem mr={4}>
                        <Link to={config.routes.brandsManager}>Brand Manager</Link>
                    </ListItem>
                    <ListItem mr={4}>
                        <Link to={config.routes.usersManager}>User Manager</Link>
                    </ListItem>
                    <ListItem mr={4}>
                        <Link to={config.routes.usersManager}>Log out</Link>
                    </ListItem>
                </List>
            </Flex>

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

export default AdminHeader;
