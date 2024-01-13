import React from 'react';
import { Flex, Box, Heading, Spinner, Text, Link, Icon } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';

const Verifying = () => {
    return (
        <Flex direction="column" align="center" justify="center" h="100vh">
            <Box textAlign="center">
                <Heading mb={4}>Đang Xác Nhận</Heading>
                <Spinner size="xl" color="teal.500" thickness="4px" />
                <Text mt={4}>Vui lòng kiểm tra email và xác nhận!</Text>
                <Flex mt={4} align="center" justify="center">
                    <Text>Chuyển qua trang</Text>
                    <Link href="/login" color="teal.500" fontWeight="bold" ml={1}>
                        Đăng nhập
                    </Link>
                    <Icon as={FaArrowRight} ml={1} />
                </Flex>
            </Box>
        </Flex>
    );
};

export default Verifying;
