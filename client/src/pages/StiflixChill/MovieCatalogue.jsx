import PropTypes from "prop-types";
import {Container, Button, Spinner} from "react-bootstrap";
import "./MovieCatalogue.css";
import {useEffect, useState} from "react";

function MovieCatalogue({ movies, page, setPage }) {
    const [loading, setLoading] = useState(false);

    const goToPage = (page) => {
        if (page <= 0) return;
        setPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        if (movies.page !== page) {
            setLoading(true);
        }else {
            setLoading(false);
        }
    }, [movies.page, page])

    return (
        <Container fluid className="movie-catalogue-container d-flex flex-column">
            <div className="movie-grid flex-grow-1 py-5">
                {loading
                    ? <Container fluid className="d-flex flex-column align-items-center justify-content-center">
                        <Spinner variant="danger" animation="border" size="sm"/>
                    </Container>
                    : movies.results.map((movie) => (
                        <div key={movie.id} className="movie-tile">
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
        </Container>
    );
}

MovieCatalogue.propTypes = {
    movies: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
};

export default MovieCatalogue;
