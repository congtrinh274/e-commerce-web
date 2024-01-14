import { Box } from '@chakra-ui/react';
import UserHeader from './UserHeader';

function UserDefaultLayout({ children }) {
    return (
        <>
            <UserHeader />
            <Box position="relative" pl={20} pr={20} pt={5}>
                {children}
            </Box>
        </>
    );
}

export default UserDefaultLayout;
