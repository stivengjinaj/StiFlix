import {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen.jsx";
import {Container} from "react-bootstrap";
import NavBar from "./NavBar.jsx";
import MainMovie from "./MainMovie.jsx";
import SecondaryMovies from "./SecondaryMovies.jsx";

function Movies() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);
        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, []);

    return (
        showSplash
            ? (<SplashScreen />)
            : (<HomePage />)
    );
}

function HomePage() {
    return (
        <Container fluid className="p-0 bg-gradient-dark-radius min-vh-100">
            <NavBar/>
            <MainMovie/>
            <SecondaryMovies/>
        </Container>
    );
}

export default Movies;