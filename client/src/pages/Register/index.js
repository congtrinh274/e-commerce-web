import React, { useState } from 'react';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGoogle, FaFacebook, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { registerValidate as validate } from '~/utils/validator';
import { register } from '~/redux/features/authSlices';
import { useDispatch } from 'react-redux';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({ username: '', email: '', password: '', confirmPassword: '' });

    const handleGoBack = () => {
        navigate(-1);
    };

    const submit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const { username, email, password, confirmPassword } = inputData;
            const formErrors = validate({ username, email, password, confirmPassword });
            if (Object.keys(formErrors).length > 0) {
                toast.error(formErrors, { position: 'top-right' });
                setLoading(false);
                return;
            }
            await dispatch(register(username, email, password));
            toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.');
            navigate('/verifying');
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
                            REGISTER
                        </Heading>
                    </HStack>

                    <form onSubmit={submit} noValidate>
                        <FormControl id="username" isRequired>
                            <FormLabel>Your name</FormLabel>
                            <Input
                                type="text"
                                onChange={(event) => setInputData({ ...inputData, username: event.target.value })}
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                onChange={(event) => setInputData({ ...inputData, email: event.target.value })}
                            />
                        </FormControl>

                        <FormControl mt={4} id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                onChange={(event) => setInputData({ ...inputData, password: event.target.value })}
                            />
                        </FormControl>

                        <FormControl mt={4} id="confirm-password" isRequired>
                            <FormLabel>Confirm password</FormLabel>
                            <Input
                                type="password"
                                onChange={(event) =>
                                    setInputData({ ...inputData, confirmPassword: event.target.value })
                                }
                            />
                        </FormControl>

                        <Button
                            colorScheme="teal"
                            width="full"
                            mt={4}
                            type="submit"
                            isLoading={loading}
                            loadingText="Đang xử lý..."
                        >
                            {loading ? null : 'Sign Up'}
                        </Button>
                    </form>

                    <HStack justify="space-between" mt={4}>
                        <Link href={config.routes.login} color="teal.500">
                            Already have an account?
                        </Link>
                    </HStack>

                    <HStack justify="space-between" mt={4} width="100%">
                        <Button colorScheme="white" variant="outline" leftIcon={<FaGoogle />} background="teal.100">
                            Sign up with Google
                        </Button>
                        <Button colorScheme="white" variant="outline" leftIcon={<FaFacebook />} background="teal.100">
                            Sign up with Facebook
                        </Button>
                    </HStack>
                </Box>
            </Flex>
        </Container>
    );
};

export default Register;
