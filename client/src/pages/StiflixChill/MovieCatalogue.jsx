import PropTypes from "prop-types";
import {Container, Button, Row, Col} from "react-bootstrap";
import "./MovieCatalogue.css";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import MovieDetails from "./MovieDetails.jsx";

function MovieCatalogue({ movies, page, setPage, setStep }) {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const cardsRef = useRef([]);
    cardsRef.current = [];

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    useEffect(() => {
        if (!cardsRef.current.length) return;

        gsap.fromTo(
            cardsRef.current,
            {
                opacity: 0,
                y: 30,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.2,
                ease: "power3.out",
                stagger: 0.06,
                clearProps: "all"
            }
        );
    }, [movies]);


    const goToPage = (page) => {
        if (page <= 0) return;
        setPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        selectedMovie
        ? <MovieDetails movie={selectedMovie} setSelectedMovie={setSelectedMovie}/>
        : <Container fluid className="movie-catalogue-container d-flex flex-column">
            <div className="movie-grid flex-grow-1 pt-5">
                {movies.results.map((movie) => (
                    <div key={movie.id} ref={addToRefs} className="movie-tile" onClick={() => setSelectedMovie(movie)}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title || movie.original_title}
                            loading="lazy"
                        />
                        <div className="movie-overlay">
                            <span className="movie-title">{movie.title || movie.original_title}</span>
                            <span className="movie-overlay-text text-light">{movie.overview}</span>
                        </div>
                    </div>
                ))}
            </div>

            <Row className="align-items-center">
                <Col md={5}>
                    <Button
                        className="home-button"
                        onClick={() => setStep(0)}
                    >
                        Home
                    </Button>
                </Col>
                <Col md={7}>
                    <div className="pagination-bar mt-auto pb-3">
                        <Button
                            variant="outline-light"
                            disabled={page === 1}
                            onClick={() => goToPage(page - 1)}
                        >
                            ‹ Prev
                        </Button>

                        <span className="page-indicator">
                    Page {page}
                </span>

                        <Button
                            variant="outline-light"
                            onClick={() => goToPage(page + 1)}
                        >
                            Next ›
                        </Button>
                    </div>
                </Col>

            </Row>


        </Container>
    );
}

MovieCatalogue.propTypes = {
    movies: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    setStep: PropTypes.func.isRequired,
};

export default MovieCatalogue;
