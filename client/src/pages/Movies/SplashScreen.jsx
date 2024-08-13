import splashScreen from '../../assets/splash_screen_desktop.json';
import Lottie from 'react-lottie'
import {getWindowDimensions} from "../../helper/miscs.js";
import {Container} from "react-bootstrap";

function SplashScreen() {
    const { width, height } = getWindowDimensions()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: splashScreen,
    };

    return (
        <Container fluid className="w-full h-screen splash-container">
            <Lottie options={defaultOptions} width={width} height={height}/>
        </Container>

    );
}

export default SplashScreen;