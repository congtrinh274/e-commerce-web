import { useSelector } from 'react-redux';

function Home() {
    const auth = useSelector((state) => state.auth);
    return <h2>Home</h2>;
}

export default Home;
