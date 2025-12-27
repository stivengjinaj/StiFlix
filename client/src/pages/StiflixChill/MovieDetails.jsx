import {useRef, useEffect, useState} from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import "./MovieCatalogue.css";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";

const MovieDetails = ({ movie, setSelectedMovie }) => {
    const containerRef = useRef(null);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const fetchTrailer = async () => {
            const fetcher = new FetchedMovieController();
            const movieTrailer = await fetcher.getTrailer(movie.id, "movie");
            if (!movieTrailer) return;
            setTrailer(movieTrailer);
        };

        // GSAP Animation
        gsap.from(containerRef.current, {
            y: 20, // Slide up slightly
            opacity: 0,
            scale: 0.96,
            duration: 0.5,
            ease: "power3.out",
        });

        fetchTrailer();
    }, [movie]);

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center py-5">
            <div className="row w-100 justify-content-center row-details">
                <div className="col-11 col-md-9 col-lg-7 col-xl-6">
                    <div
                        ref={containerRef}
                        className="movie-details-card overflow-hidden"
                    >
                        <div className="d-flex justify-content-between align-items-start p-4 gap-3">
                            <h1 className="movie-details-title flex-grow-1 mb-0">
                                {movie.title}
                            </h1>
                            <span className="movie-rating badge bg-dark fs-6 mt-1">
                                Rating: {Number(movie.vote_average).toFixed(1)}
                            </span>
                        </div>

                        <div className="w-100 position-relative overflow-hidden" style={{ maxHeight: "400px" }}>
                            {trailer ? (
                                <div className="ratio ratio-16x9 h-100">
                                    <iframe
                                        src={trailer}
                                        title="Movie Trailer"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <img
                                    className="img-fluid w-100 h-100"
                                    style={{ objectFit: "cover" }}
                                    src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                                    alt={movie.title}
                                />
                            )}
                        </div>

                        <div className="p-4">
                            <div className="movie-overview-container custom-scrollbar mb-4">
                                <p className="movie-overview mb-0">
                                    {movie.overview}
                                </p>
                            </div>

                            <div className="d-flex gap-3">
                                <button className="btn btn-play flex-grow-1 py-2">
                                    ▶ Play
                                </button>
                                <button
                                    className="btn btn-info flex-grow-1 py-2"
                                    onClick={() => setSelectedMovie(null)}
                                >
                                    Back to Catalogue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

MovieDetails.propTypes = {
    movie: PropTypes.object.isRequired,
    setSelectedMovie: PropTypes.func.isRequired,
};

export default MovieDetails;