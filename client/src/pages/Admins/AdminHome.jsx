import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const AdminHome = () => {
    return (
        <Flex align="center" justify="center" h="50vh" direction="column">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Welcome Admin
            </Text>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                {/* Nhúng iframe từ Giphy */}
            </motion.div>
            <div>
                <iframe
                    src="https://giphy.com/embed/Rjub7AIEIbXT0tzbr3"
                    width="400"
                    height="300"
                    allowFullScreen
                ></iframe>
            </div>
        </Flex>
    );
};

export default AdminHome;
