import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import AdminDefaultLayout from '~/Layouts/AdminDefaultLayout';
import { Container } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '~/redux/features/productSlices';
import UserDefaultLayout from './Layouts/UserDefaultLayout';
import { useEffect } from 'react';

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const getProducts = async () => {
            try {
                await dispatch(getAllProducts);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);
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
