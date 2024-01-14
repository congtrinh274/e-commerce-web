import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import AdminDefaultLayout from '~/Layouts/AdminDefaultLayout';
import { Container } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '~/redux/features/productSlices';
import UserDefaultLayout from './Layouts/UserDefaultLayout';

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Dispatch action to get all products
                await dispatch(getAllProducts());
            } catch (error) {
                console.log(error);
            }
        };

        // Check if products are not available in the store
        if (!products || products.length === 0) {
            // Fetch products only if not already available
            fetchData();
        }
    }, [dispatch, products]);

    // Wait until products are available before rendering the app
    if (!products || products.length === 0) {
        return <div>Loading...</div>; // You can render a loading spinner or any other loading indicator
    }

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
