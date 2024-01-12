import React from 'react';
import {
    Box,
    Container,
    FormControl,
    FormLabel,
    Input,
    Button,
    Link,
    Heading,
    Flex,
    HStack,
    IconButton,
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const Login = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <Container maxW="3xl" centerContent>
            <Flex direction="column" align="center" justify="center" h="100vh">
                <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" w="100%">
                    <HStack justify="space-between" mb={4} width="100%">
                        <IconButton icon={<FaArrowLeft />} colorScheme="teal" fontSize="1rem" onClick={handleGoBack} />
                        <Heading
                            fontSize="3xl"
                            color="teal.500"
                            fontWeight="bold"
                            flex={1}
                            textAlign="center"
                            alignItems="center"
                        >
                            LOGIN
                        </Heading>
                    </HStack>

                    <form>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" />
                        </FormControl>

                        <FormControl mt={4} id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" />
                        </FormControl>

                        <Button colorScheme="teal" width="full" mt={4} type="submit">
                            Sign In
                        </Button>
                    </form>

                    <HStack justify="space-between" mt={4}>
                        <Link href="#" color="teal.500">
                            Forgot password?
                        </Link>
                        <Link href={config.routes.register} color="teal.500">
                            Sign Up
                        </Link>
                    </HStack>

                    <HStack justify="space-between" mt={4} width="100%">
                        <Button colorScheme="white" variant="outline" leftIcon={<FaGoogle />} background="teal.100">
                            Login with Google
                        </Button>
                        <Button colorScheme="white" variant="outline" leftIcon={<FaFacebook />} background="teal.100">
                            Login with Facebook
                        </Button>
                    </HStack>
                </Box>
            </Flex>
        </Container>
    );
};

export default Login;
