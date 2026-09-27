/* eslint-disable react/prop-types */
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function GridMovies({ movies, type }) {
    const navigate = useNavigate();
    const containerRef = useRef();
    const movieEntries = Array.isArray(movies)
        ? movies.map(movie => {
            const movieId = movie.id ?? movie.movieId;
            const mediaType = movie.mediaType ?? (movie.isSeries ? "tv" : type === "tvShows" ? "tv" : "movie");
            return { movie, movieId, mediaType };
        })
        : [];
    const uniqueMovies = Array.from(
        new Map(movieEntries.map(entry => [`${entry.mediaType}-${entry.movieId}`, entry])).values()
    );
    const hasMovies = uniqueMovies.length > 0;

    return (
        <div ref={containerRef}>
            {hasMovies ? (
                <Container fluid className="py-5 allMovies">
                    <Row>
                        {uniqueMovies.map(({ movie, movieId, mediaType }) => {
                            return (
                                <Col xs={4} sm={4} md={3} lg={2} key={`${mediaType}-${movieId}`} className="mb-4">
                                    <Card
                                        className="h-100 border-0 movie-card"
                                        onClick={() => navigate(`/movies/info/${mediaType}/${movieId}`)}
                                    >
                                        <Card.Img
                                            variant="top"
                                            src={`https://image.tmdb.org/t/p/w500/${movie.posterPath || movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            ) : (
                <Container fluid className="d-flex justify-content-center bg-gradient-dark-radius">
                    <h2 className="text-white mt-5 mx-3">
                        No movies in {type === "favourites" ? "Favourites" : type === "watchLater" ? "Watch Later" : "Watchlist"} yet
                    </h2>
                </Container>
            )}
        </div>
    );
}

export default GridMovies;