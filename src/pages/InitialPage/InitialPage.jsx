import {Button, Col, Container, Row} from "react-bootstrap";
import logo from "../../assets/logo.png";
import tvvideo from "../../assets/tv.mp4";
import devicePile from "../../assets/device-pile.mp4";

import FeatureRow from "./FeatureRow.jsx";

function InitialPage() {
    return (
        <Container fluid className="p-0">
            <Container fluid className="initial-bg">
                <Row className="bg-gradient-dark py-4 mb-5 mx-0">
                    <Col className="d-flex justify-content-center align-items-center">
                        <img src={logo} alt="Logo" width={150} height={50} />
                    </Col>
                    <Col className="d-flex justify-content-evenly align-items-center py-3">
                        <Button className="btn-danger px-3 py-1">
                            <strong>Sign in</strong>
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center mx-0">
                    <Col className="d-flex flex-column justify-content-center align-items-center text-center mt-5">
                        <h1 className="text-white mt-5">Unlimited films, TV programmes and more</h1>
                        <h3 className="text-white mt-3">
                            <strong>Watch anywhere. Always free.</strong>
                        </h3>
                        <h4 className="text-white mt-3">
                            <strong>Ready to watch? Hit that button</strong>
                        </h4>
                        <Button className="btn-danger py-4 px-5 mt-5 mb-3">
                            <h2><strong>Go to the cinema</strong></h2>
                        </Button>
                    </Col>
                </Row>
            </Container>

            <Container fluid className="min-vh-100 bg-gradient-dark-radius">
                <FeatureRow
                    hOne="Enjoy on your TV."
                    hFourFirst="Watch on smart TVs, PlayStation, Xbox, Chromecast,"
                    hFourSecond="Apple TV, Blu-ray players and more."
                    video={tvvideo}
                    textDirection="left"
                />
                <div style={{backgroundColor: '#2b2a2a', height: '7px', width: '100%', margin: '2rem 0'}}></div>
                <FeatureRow
                    hOne="Watch everywhere."
                    hFourFirst="Stream unlimited films and TV programmes on your"
                    hFourSecond="phone, tablet, laptop and TV for free."
                    video={devicePile}
                    textDirection="right"
                />
            </Container>
        </Container>
    );
}

export default InitialPage