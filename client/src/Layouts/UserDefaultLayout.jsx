import { Container } from '@chakra-ui/react';
import UserHeader from './UserHeader';

function UserDefaultLayout({ children }) {
    return (
        <>
            <UserHeader />
            <Container>{children}</Container>
        </>
    );
}

export default UserDefaultLayout;
