import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '~/redux/features/authSlices';
import { loginValidate as validate } from '~/utils/validator';
import config from '~/config';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoBack = () => {
        navigate('/');
    };

    const submit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const formErrors = validate({ email, password });
            if (Object.keys(formErrors).length > 0) {
                toast.error(formErrors, { position: 'top-right' });
                setLoading(false);
                return;
            }

            await dispatch(login(email, password));
            navigate('/');
        } catch (error) {
            if (error.message === 'Request timeout') {
                toast.error(error.message || 'Đã xảy ra lỗi!', { position: 'top-right' });
            } else {
                toast.error(error, { position: 'top-right' });
            }
            setLoading(false);
        }
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

                    <form onSubmit={submit} noValidate>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" onChange={(event) => setEmail(event.target.value)} />
                        </FormControl>

                        <FormControl mt={4} id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" onChange={(event) => setPassword(event.target.value)} />
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
