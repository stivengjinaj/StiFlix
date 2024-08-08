import {Button, Col, Container, Row} from "react-bootstrap";
import test_bg from "../../assets/got.png";

import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

function MainMovie() {

    useGSAP(() => {
        gsap.from('.main-banner', {
            x: 100,
            opacity: 0,
        })
        gsap.from('.main-banner-title', {
            delay: 0.2,
            y: 50,
            opacity: 0,
        })
        gsap.from('.main-banner-category', {
            delay: 0.4,
            y: 50,
            opacity: 0,
        })
        gsap.from('.main-banner-description', {
            delay: 0.8,
            y: 50,
            opacity: 0,
        })
        gsap.from('button', {
            delay: 1.0,
            y: 50,
            opacity: 0,
        })
    })

    return (
        <Container fluid className="d-flex flex-column main-banner" style={{ backgroundImage: `url(${test_bg})` }}>
            <Container fluid className="px-0 pt-5 mt-5 mx-0">
                <Row className="justify-content-start ml-3">
                    <Col xs={12} md={8} lg={6} xl={5} className="text-center mt-5">
                        <h1 className="text-white main-banner-title mt-5">Game of Thrones</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8} lg={6} xl={5} className="text-center">
                        <h6 className="text-white main-banner-category">
                            <strong>TV Series &#x2022; 2011–2019 &#x2022; 18 &#x2022; 1h</strong>
                        </h6>
                    </Col>
                </Row>
                <Row className="justify-content-start align-items-center mt-2 px-5">
                    <Col xs={12} md={8} lg={6} xl={5}>
                        <h5 className="text-white main-banner-description">
                            Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night`s Watch, is all that stands between the realms of men and icy horrors beyond.
                        </h5>
                    </Col>
                </Row>
                <Row className="justify-content-start align-items-center mt-3 px-5">
                    <Col md={8} lg={6} xl={10} className="action-buttons">
                        <div className="d-flex justify-content-start main-banner-controls">
                            <Button variant="light" className="d-flex align-items-center px-5 mr-3">
                                <i className="bi bi-play-fill fs-1"></i>
                                <h4 className="text-dark mb-0 ml-2">Play</h4>
                            </Button>
                            <div className="d-none d-md-block">
                                <Button variant="secondary" className="d-flex align-items-center px-5 mx-3">
                                    <i className="bi bi-info-circle fs-1"></i>
                                    <h4 className="text-white mb-0 mx-3 font-weight-bold">More Info</h4>
                                </Button>
                            </div>
                            <div className="d-flex d-md-none justify-content-center mx-3">
                                <Button variant="secondary" className="d-flex align-items-center px-3">
                                    <i className="bi bi-info-circle fs-1"></i>
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}


export default MainMovie;