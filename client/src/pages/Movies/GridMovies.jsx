import { useGSAP } from "@gsap/react";
/* eslint-disable react/prop-types */
import { Card, Col, Container, Row } from "react-bootstrap";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function GridMovies({ movies, type }) {
    const navigate = useNavigate();
    const containerRef = useRef();

    useGSAP(() => {
        if (movies && movies.length > 0) {
            gsap.from('.movie-card', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5
            });
        }
    }, { dependencies: [movies], scope: containerRef });

    const hasMovies = movies && Array.isArray(movies) && movies.length > 0;
    
    return (
        <div ref={containerRef}>
            {hasMovies ? (
                <Container fluid className="py-5 allMovies">
                    <Row>
                        {movies.map((movie) => (
                            <Col xs={4} sm={4} md={3} lg={2} key={movie.movieId} className="mb-4">
                                <Card
                                    className="h-100 border-0 movie-card"
                                    onClick={() => navigate(`/movies/info/${movie.isSeries ? "tv" : "movie"}/${movie.id}`)}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
                                        alt={movie.title}
                                    />
                                </Card>
                            </Col>
                        ))}
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