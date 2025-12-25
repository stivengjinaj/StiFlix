import { useEffect, useRef, useState } from 'react';
import {Container, Card, Row, Col, Button, Badge, Image} from 'react-bootstrap';
import gsap from 'gsap';
import got from "../../assets/images/got.png";
import got2 from "../../assets/images/sc_background.png";
import './RandomChoice.css';
import {shuffleArray2} from "../../helper/miscs.js";
import PropTypes from "prop-types";

const MOVIES = [
    { id: 1, title: 'Movie Title 1', year: 2023, genre: 'Action', duration: '2h 15m', cover: got },
    { id: 2, title: 'Movie Title 2', year: 2022, genre: 'Romance', duration: '1h 45m', cover: got2 },
    { id: 3, title: 'Movie Title 3', year: 2024, genre: 'Thriller', duration: '2h 5m', cover: got },
    { id: 4, title: 'Movie Title 4', year: 2023, genre: 'Comedy', duration: '1h 30m', cover: got2 },
    { id: 5, title: 'Movie Title 5', year: 2022, genre: 'Drama', duration: '2h 20m', cover: got },
    { id: 6, title: 'Movie Title 6', year: 2024, genre: 'Sci-Fi', duration: '2h 30m', cover: got2 },
    { id: 7, title: 'Movie Title 7', year: 2023, genre: 'Horror', duration: '1h 50m', cover: got },
    { id: 8, title: 'Movie Title 8', year: 2022, genre: 'Adventure', duration: '2h 10m', cover: got2 },
];

const INITIAL_POOL = [...MOVIES, ...MOVIES, ...MOVIES, ...MOVIES];

const RandomChoice = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const [displayMovies, setDisplayMovies] = useState(INITIAL_POOL);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isAnimating, setIsAnimating] = useState(true);

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    useEffect(() => {
        if (!isAnimating) return;

        const intervalId = setInterval(() => {
            setDisplayMovies(prev => shuffleArray2(prev));
        }, 80);

        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);

            const randomIndex = Math.floor(Math.random() * MOVIES.length);
            setSelectedMovie(MOVIES[randomIndex]);

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            gsap.set(cardsRef.current, {
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                rotate: 0
            });

            gsap.to(cardsRef.current, {
                duration: 0.8,
                ease: "power3.in",

                x: (i, target) => {
                    const rect = target.getBoundingClientRect();
                    return centerX - rect.left - (rect.width / 2);
                },
                y: (i, target) => {
                    const rect = target.getBoundingClientRect();
                    return centerY - rect.top - (rect.height / 2);
                },

                scale: 0,
                opacity: 0,
                rotate: 720,
                stagger: {
                    amount: 0.1,
                    from: "random"
                },

                onComplete: () => {
                    setIsAnimating(false);
                }
            });

        }, 3000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            gsap.killTweensOf(cardsRef.current);
        };
    }, [isAnimating]);

    if (!isAnimating) return (
        <ResultView movie={selectedMovie} onRollAgain={() => {
            gsap.killTweensOf(cardsRef.current);
            gsap.set(cardsRef.current, {
                clearProps: "all"
            });

            cardsRef.current = [];
            setDisplayMovies(INITIAL_POOL);
            setSelectedMovie(null);
            setIsAnimating(true);
        }}/>
    );

    return (
        <Container
            fluid
            ref={containerRef}
            className="d-flex flex-wrap justify-content-center align-content-center vh-100 bg-transparent overflow-hidden p-0"
        >
            {displayMovies.map((movie, index) => (
                <div
                    key={index}
                    ref={addToRefs}
                    className="m-3"
                    style={{
                        width: '140px',
                        height: '210px',
                    }}
                >
                    <Card className="h-100 border-0 bg-transparent text-white">
                        <Card.Img
                            src={movie.cover}
                            className="h-100 w-100"
                            style={{ objectFit: 'cover', borderRadius: '8px' }}
                        />
                    </Card>
                </div>
            ))}
        </Container>
    );
}

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
                                src={movie.cover}
                                fluid
                                rounded
                                className="poster-shadow"
                                style={{ maxHeight: '60vh' }}
                            />
                        </Col>

                        <Col md={7} lg={6} className="text-center text-md-start ps-md-5">

                            <h1 className="display-3 fw-bold mb-3" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}>
                                {movie.title}
                            </h1>

                            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-4 gap-3 text-light">
                                <span className="fw-bold text-success">98% Match</span>
                                <span>{movie.year}</span>
                                <Badge bg="secondary" className="border border-white bg-transparent">HD</Badge>
                                <span>{movie.duration}</span>
                            </div>

                            <p className="lead mb-4 text-white-50">
                                {movie.description || "A gripping tale that keeps you on the edge of your seat. Selected just for you by the algorithm."}
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

export default RandomChoice;