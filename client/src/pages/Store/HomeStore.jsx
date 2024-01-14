import { useSelector } from 'react-redux';

function HomeStore() {
    const auth = useSelector((state) => state.auth);
    console.log(auth.user);
    return <h2>Home Store</h2>;
}

export default HomeStore;
