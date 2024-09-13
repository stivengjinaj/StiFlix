import splashScreenDark from '../../assets/splash_screen_dark.json';
import Lottie from 'react-lottie'
import {getWindowDimensions} from "../../helper/miscs.js";
import {Container} from "react-bootstrap";

function SplashScreen() {
    const { width, height } = getWindowDimensions()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: splashScreenDark,
    };

    return (
        <Container
            fluid
            className="p-0 w-full h-screen splash-container"
            style={{
                overflow: 'hidden',
                width: '100vw',
                height: '100vh',
            }}
        >
            <Lottie options={defaultOptions} width={width} height={height}/>
        </Container>
    );
}

export default SplashScreen;