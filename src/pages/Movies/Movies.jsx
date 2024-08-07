import {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen.jsx";
import {Col, Container, Row} from "react-bootstrap";

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
            <Row>
                <Col className="d-flex justify-content-center align-items-center mt-5">
                    <h1 className="text-white">MOVIES GO HERE</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default Movies;