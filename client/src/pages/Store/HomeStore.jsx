import { useDispatch, useSelector } from 'react-redux';
import OrderManager from './Components/OrderManager';
import ProductContainer from './Components/ProductContainer';
import { useEffect, useState } from 'react';
import { getStore } from '~/redux//features/storeSlices';

function HomeStore() {
    const dispatch = useDispatch();
    const [run, setRun] = useState(false);
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        const getSeller = async (userId) => {
            try {
                await dispatch(getStore(auth.user._id, auth.accessToken));
            } catch (error) {
                console.log(error);
            }
        };
        getSeller();
        setRun(true);
    }, []);
    return (
        <>
            <OrderManager />
            {run && <ProductContainer />}
        </>
    );
}

export default HomeStore;
