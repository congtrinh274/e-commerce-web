import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategorySlide from '~/components/CategorySlide';
import ProductSlide from '~/components/ProductSlide';

function Home() {
    const auth = useSelector((state) => state.auth);
    const productsData = useSelector((state) => state.products.products);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([...productsData]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get('http://192.168.0.104:5000/category');
                setCategories(response.data);
            } catch (error) {
                console.error('Error get categories:', error);
            }
        };
        getCategories();
    }, []);

    return (
        <>
            <CategorySlide categories={categories} />
            <ProductSlide products={products} heading="Hot Deal" />
            <ProductSlide products={products} heading="Most searched" />
        </>
    );
}

export default Home;
