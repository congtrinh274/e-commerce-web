import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import AdminDefaultLayout from '~/Layouts/AdminDefaultLayout';
import { Container } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import UserDefaultLayout from './Layouts/UserDefaultLayout';

function App() {
    const user = useSelector((state) => state.auth.user);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.components;

                        let Layout = user.isAdmin ? AdminDefaultLayout : UserDefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = <Container />;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
