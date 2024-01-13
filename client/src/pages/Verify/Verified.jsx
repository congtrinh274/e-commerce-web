import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Button, Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { checkIcon, closeIcon } from '~/assets/images';
import axios from 'axios';

const Verify = () => {
    const { token } = useParams();
    const [validUrl, setValidUrl] = useState(true);
    console.log(validUrl, token);
    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                await axios.get(`http://192.168.0.104:5000/auth/verify/${token}`);
                setValidUrl(true);
            } catch (error) {
                console.error('Error verifying email:', error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [token]);

    return (
        <Container maxW="3xl" centerContent>
            {validUrl ? (
                <Box
                    p={8}
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="lg"
                    w="100%"
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Image src={checkIcon} alt="Check Circle" mb={4} w={125} alignSelf="center" />
                    <Heading fontSize="3xl" color="teal.500" fontWeight="bold" mt={4}>
                        Xác nhận thành công
                    </Heading>
                    <Box fontSize="lg" color="gray.600" mt={4}>
                        Đăng nhập để trải nghiệm đầy đủ các tính năng của chúng tôi.
                    </Box>
                    <Button colorScheme="teal" mt={8} onClick={() => (window.location.href = '/login')}>
                        Đăng nhập
                    </Button>
                </Box>
            ) : (
                <Box
                    p={8}
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="lg"
                    w="100%"
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Image src={closeIcon} alt="Check Circle" mb={4} w={125} alignSelf="center" />
                    <Heading fontSize="3xl" color="teal.500" fontWeight="bold" mt={4}>
                        404 Not Found!
                    </Heading>
                </Box>
            )}
        </Container>
    );
};

export default Verify;
