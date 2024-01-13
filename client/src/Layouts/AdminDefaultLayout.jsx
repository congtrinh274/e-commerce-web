import { Box } from '@chakra-ui/react';
import AdminHeader from './AdminHeader';

function AdminDefaultLayout({ children }) {
    return (
        <>
            <AdminHeader />
            <Box position="relative" padding={20}>
                {children}
            </Box>
        </>
    );
}

export default AdminDefaultLayout;
