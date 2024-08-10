import {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen.jsx";
import {Container} from "react-bootstrap";
import NavBar from "./NavBar.jsx";
import MainMovie from "./MainMovie.jsx";
import logo1 from "../../assets/test_bg.png";
import logo2 from "../../assets/got.png";
import logo3 from "../../assets/narcos_logo.jpg";
import logo4 from "../../assets/test_bg2.jpg";
import logo5 from "../../assets/test_bg.png";
import logo6 from "../../assets/got.png";
import logo7 from "../../assets/narcos_logo.jpg";
import logo8 from "../../assets/test_bg2.jpg";
import logo9 from "../../assets/test_bg.png";
import MoviesCarousel from "./MoviesCarousel.jsx";

function Movies() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        showSplash
            ? (<SplashScreen />)
            : (<HomePage/>)
    );
}

function HomePage() {
    const [images ] = useState([logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo7, logo8, logo9]);

    return (
        <Container fluid className="p-0 bg-gradient-dark-radius min-vh-100">
            <NavBar/>
            <MainMovie />
            <MoviesCarousel title={"Popular on Stiflix"} images={images} moving={true}/>
            <MoviesCarousel title={"Trending Now"} images={images} moving={false}/>
        </Container>
    );
}

export default Movies;