import PropTypes from "prop-types";
import {Badge, Button, Col, Container, Image, Row} from "react-bootstrap";
import {useEffect, useRef} from "react";
import gsap from "gsap";

const ResultView = ({ movie, onRollAgain }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            containerRef.current,
            {
                opacity: 0,
                scale: 0.4,
                y: 80,
                transformPerspective: 1000,
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                ease: "power4.out",
                delay: 0.15,
            }
        );
    }, []);

    if (!movie) return null;

    return (
        <div className="position-relative vh-100 w-100 overflow-hidden d-flex flex-column align-items-center justify-content-center text-white">
            <div ref={containerRef}>
                <h1
                    className="text-center fw-bold mb-4"
                    style={{
                        textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
                        zIndex: 10,
                        position: 'relative',
                    }}
                >
                    Our choice for you
                </h1>
                <Container className="result-glass" style={{ position: 'relative', zIndex: 10 }}>
                    <Row className="align-items-center justify-content-center">

                        <Col md={5} lg={4} className="mb-4 mb-md-0 text-center">
                            <Image
                                fluid
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={"Movie Cover"}
                                className="poster-shadow"
                                style={{ maxHeight: '40vh' }}
                            />
                        </Col>

                        <Col md={7} lg={6} className="text-center text-md-start ps-md-5">

                            <h1 className="display-3 fw-bold mb-3" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}>
                                {movie.original_title || movie.original_name}
                            </h1>

                            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-4 gap-3 text-light">
                                <span className="fw-bold text-success">Rating: {movie.vote_average}</span>
                                <Badge bg="secondary" className="border border-white bg-transparent">HD</Badge>
                            </div>

                            <p className="lead mb-4 text-white-50">
                                {movie.overview}
                            </p>

                            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                                <Button className="btn-netflix-play d-flex align-items-center gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                    Play Movie
                                </Button>

                                <Button
                                    className="btn-netflix-secondary d-flex align-items-center gap-2"
                                    onClick={onRollAgain}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M23 4v6h-6M1 20v-6h6"/>
                                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                                    </svg>
                                    Roll Again
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>


        </div>
    );
};

ResultView.propTypes = {
    movie: PropTypes.object.isRequired,
    onRollAgain: PropTypes.func.isRequired,
}

export default ResultView;