/* eslint-disable react/prop-types */
import { Button, Col, Container, Row } from "react-bootstrap";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";
import MoreInfo from "./MoreInfo.jsx";

function MainMovie({ mainMovie }) {
    const [currentMovie, setCurrentMovie] = useState(null);
    const [playMovieSplash, setPlayMovieSplash] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (mainMovie && mainMovie.length > 0) {
            setCurrentMovie(mainMovie[0]);
        }
    }, [mainMovie]);

    useGSAP(() => {
        gsap.from('.main-banner', {
            x: 100,
            opacity: 0,
        });
        gsap.from('.main-banner-title', {
            delay: 0.2,
            y: 50,
            opacity: 0,
        });
        gsap.from('.main-banner-category', {
            delay: 0.4,
            y: 50,
            opacity: 0,
        });
        gsap.from('.main-banner-description', {
            delay: 0.8,
            y: 50,
            opacity: 0,
        });
        gsap.from('button', {
            delay: 1.0,
            y: 50,
            opacity: 0,
        });
    }, [mainMovie[0]]);

    useEffect(() => {
        if (playMovieSplash) {
            gsap.fromTo('.splash-screen', {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 2,
                ease: 'ease-in-out',
                onComplete: () => {
                    navigate('/movies/12345');
                }
            });
        }
    }, [playMovieSplash, navigate]);

    const handlePlayClick = () => {
        setPlayMovieSplash(true);
    };

    return (
        <>
            <div className={`splash-screen ${playMovieSplash ? 'visible' : 'invisible'}`} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                zIndex: playMovieSplash ? 1000 : -1,
            }}></div>

            {
                currentMovie && currentMovie.backdrop_path
                    ? (
                        <Container fluid className="d-flex flex-column main-banner position-relative"
                                   style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path})`}}>
                            <Container fluid className="px-0 pt-5 mt-5 mx-0">
                                <Row className="justify-content-start align-items-center mt-2 px-5">
                                    <Col xs={12} md={8} lg={6} xl={5} className="mt-3 text-center text-md-start">
                                        <h1 className="text-white main-banner-title mt-5">{currentMovie.title}</h1>
                                    </Col>
                                </Row>
                                <Row className="justify-content-start align-items-center mt-2 px-5">
                                    <Col xs={12} md={8} lg={6} xl={5} className="text-center text-md-start">
                                        <h6 className="text-white main-banner-category">
                                            <strong>{currentMovie.release_date} &#x2022; {currentMovie.isSeries ? "TV Show" : "Movie"} &#x2022; {currentMovie.vote_average.toString().slice(0, 3)}/10</strong>
                                        </h6>
                                    </Col>
                                </Row>
                                <Row className="justify-content-start align-items-center mt-2 px-5">
                                    <Col xs={12} md={8} lg={6} xl={4}>
                                        <h5 className="text-white main-banner-description">
                                            {currentMovie.overview}
                                        </h5>
                                    </Col>
                                </Row>
                                <Row className="justify-content-start align-items-center mt-3 px-5">
                                    <Col md={8} lg={6} xl={10} className="action-buttons">
                                        <div className="d-flex justify-content-start main-banner-controls">
                                            <Button onClick={handlePlayClick} variant="light"
                                                    className="d-flex align-items-center px-5 mr-3">
                                                <i className="bi bi-play-fill fs-1"></i>
                                                <h4 className="text-dark mb-0 ml-2">Play</h4>
                                            </Button>
                                            <div className="d-none d-md-block">
                                                <Button onClick={() => setShowMoreInfo(true)} variant="secondary" className="d-flex align-items-center px-5 mx-3">
                                                    <i className="bi bi-info-circle fs-1"></i>
                                                    <h4 className="text-white mb-0 mx-3 font-weight-bold">More Info</h4>
                                                </Button>
                                                <MoreInfo show={showMoreInfo} onHide={() => setShowMoreInfo(false)} movie={currentMovie}/>
                                            </div>
                                            <div className="d-flex d-md-none justify-content-center mx-3">
                                                <Button onClick={() => setShowMoreInfo(true)} variant="secondary" className="d-flex align-items-center px-3">
                                                    <i className="bi bi-info-circle fs-1"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Container>
                    )
                    : (
                        <Container className="justify-content-center d-flex flex-column main-banner">
                            <Row>
                                <Loading/>
                            </Row>
                        </Container>
                    )
            }
        </>
    );
}

export default MainMovie;
