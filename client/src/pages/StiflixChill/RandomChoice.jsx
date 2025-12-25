import { useEffect, useRef, useState } from 'react';
import {Container, Card} from 'react-bootstrap';
import gsap from 'gsap';
import './RandomChoice.css';
import {shuffleArray2} from "../../helper/miscs.js";
import PropTypes from "prop-types";
import ResultView from "./ResultView.jsx";

const RandomChoice = ({ movies }) => {
    const containerRef = useRef(null);
    const initial_pool = useRef([...movies.results, ...movies.results].slice(movies.length / 2));
    const cardsRef = useRef([]);
    const [displayMovies, setDisplayMovies] = useState(initial_pool.current);
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

            const randomIndex = Math.floor(Math.random() * initial_pool.current.length);
            setSelectedMovie(initial_pool.current[randomIndex]);

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
        <ResultView movies={movies} movie={selectedMovie} onRollAgain={() => {
            gsap.killTweensOf(cardsRef.current);
            gsap.set(cardsRef.current, {
                clearProps: "all"
            });

            cardsRef.current = [];
            setDisplayMovies(initial_pool.current);
            setSelectedMovie(null);
            setIsAnimating(true);
        }}/>
    );

    return (
        <Container
            fluid
            ref={containerRef}
            className="d-flex flex-wrap justify-content-center align-content-center vh-100 bg-transparent overflow-hidden px-0 pb-0 pt-5"
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
                    <Card className="h-100 border-0 bg-transparent text-white pt-5">
                        <Card.Img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            className="h-100 w-100"
                            style={{ objectFit: 'cover', borderRadius: '8px' }}
                        />
                    </Card>
                </div>
            ))}
        </Container>
    );
}

RandomChoice.propTypes = {
    movies: PropTypes.object,
}

export default RandomChoice;