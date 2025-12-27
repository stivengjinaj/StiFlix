import EpisodeCard from "./EpisodeCard.jsx";

{/*eslint-disable react/prop-types*/}
import {Button, Col, Container, Dropdown, Navbar, Row, Spinner} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";
import {useEffect, useState} from "react";
import Loading from "../Miscs/Loading.jsx";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {containsNonLatinChars} from "../../helper/miscs.js";
import {
    addToFavourites,
    addToWatchLater,
    addToWatchList,
    removeFromFavourites, removeFromWatchLater,
    removeFromWatchList
} from "../../API.js";

function MovieDetails(props) {
    const fetcher = new FetchedMovieController();
    const navigate = useNavigate();
    const {mediaType, movieId} = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState('');
    const [noTrailer, setNoTrailer] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const [watchList, setWatchList] = useState(false);
    const [watchLater, setWatchLater] = useState(false);
    const [playMovieSplash, setPlayMovieSplash] = useState(false);
    const [screen, setScreen] = useState("desktop");
    const [currentSeason, setCurrentSeason] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(null);

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            setScreen("mobile");
        } else {
            setScreen("desktop");
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            const fetchedMovie = await fetcher.getMediaDetails(movieId, mediaType);
            const trailer = await fetcher.getTrailer(fetchedMovie.id, fetchedMovie.isSeries ? 'tv' : 'movie');
            trailer === null ? setNoTrailer(false) : setNoTrailer(true);
            setMovie(fetchedMovie);
            setTrailer(trailer);
        }

        fetchData();
    }, [])

    useEffect(() => {
        const getUserPersonalData = async () => {
            if(!props.userMovies) return;
                console.log(props.userMovies);
                props.userMovies.favourites.map(favourite => {
                    favourite.movieId === movieId ? setIsFavourite(true) : setIsFavourite(false);
                });

                props.userMovies.watchList.map(watched => {
                    watched.movieId === movieId ? setWatchList(true) : setWatchList(false);
                });

                props.userMovies.watchLater.map(toWatch => {
                    toWatch.movieId === movieId ? setWatchLater(true) : setWatchLater(false);
                });
        }
        getUserPersonalData();
    }, [props.userMovies]);

    useEffect(() => {
        if (playMovieSplash && !props.isSmartTV) {
            gsap.fromTo('.splash-screen', {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 2,
                ease: 'ease-in-out',
                onComplete: () => {
                    mediaType === 'movie' ? navigate(`/movie/${movieId}/1/1`) : navigate(`/tv/${movieId}/${currentSeason}/${currentEpisode}`);
                }
            });
        }
    }, [playMovieSplash, navigate]);

    const onPlay = (season=null, episode=null) => {
        if(season && episode) {
            setCurrentSeason(season);
            setCurrentEpisode(episode);
        }
        setPlayMovieSplash(true);
    }

    const onFavourite = async () => {
        if (!props.user) return
        if (isFavourite){
            setIsFavourite(false);
            const removeMovie = await removeFromFavourites(props.user.token, movieId)

            if(!removeMovie){
                setIsFavourite(true);
            }
        }else {
            setIsFavourite(true);
            const addMovie = await addToFavourites(props.user.token, {
                mediaType,
                movieId,
            });

            if (!addMovie) {
                setIsFavourite(false);
            }
        }
    };

    const onWatchlist = async () => {
        if (!props.user) return
        if (watchList){
            setWatchList(false);
            const removeMovie = await removeFromWatchList(props.user.token, movieId)

            if(!removeMovie){
                setWatchList(true);
            }
        }else {
            setWatchList(true);
            const addMovie = await addToWatchList(props.user.token, {
                mediaType,
                movieId,
            });

            if (!addMovie) {
                setWatchList(false);
            }
        }
    };


    const onWatchLater = async () => {
        if (!props.user) return
        if (watchLater){
            setWatchLater(false);
            const removeMovie = await removeFromWatchLater(props.user.token, movieId)
            if(!removeMovie){
                setWatchLater(true);
            }
        }else {
            setWatchLater(true);
            const addMovie = await addToWatchLater(props.user.token, {
                mediaType,
                movieId,
            });

            if (!addMovie) {
                setWatchLater(false);
            }
        }
    };

    useGSAP(() => {
        if(!props.isSmartTV) {
            gsap.from('.main-container', {
                opacity: 0,
                duration: 1
            })

            gsap.from('.main-banner-title', {
                opacity: 0,
                y: 100,
                duration: 1
            })

            gsap.from('.main-banner-video', {
                opacity: 0,
                duration: 1
            })

            gsap.from('.categories', {
                opacity: 0,
                duration: 1
            })

            gsap.from('.main-banner-description', {
                opacity: 0,
                y: 100,
                duration: 1
            })

            gsap.from('.main-banner-actions', {
                opacity: 0,
                y: 100,
                duration: 1
            })
        }
    }, [trailer]);

    return (
      movie
          ? (
              <>
                  <div className={`splash-screen ${playMovieSplash ? 'visible' : 'invisible'}`} style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100vh',
                      backgroundColor: 'black',
                      zIndex: playMovieSplash ? 1000 : -1,
                  }}></div>
                  <Container fluid className="movie-details w-100 p-0" style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/${screen === "desktop" ? movie.backdrop_path : movie.poster_path})`,
                  }}>
                      <Navbar className="bg-gradient-dark"
                              style={{backgroundColor: mediaType === "tv" && "rgb(0,0,0,0.7)"}}>
                          <Navbar.Brand>
                              <Button variant="transparent" onClick={() => navigate('/movies')}>
                                  <strong><i className="bi bi-arrow-left text-white h1"></i></strong>
                              </Button>
                          </Navbar.Brand>
                      </Navbar>
                      {
                          mediaType === 'movie'
                              ? <Movie
                                  movie={movie}
                                  trailer={trailer}
                                  noTrailer={noTrailer}
                                  user={props.user}
                                  isFavourite={isFavourite}
                                  isWatched={watchList}
                                  toWatch={watchLater}
                                  onFavourite={onFavourite}
                                  onWatchlist={onWatchlist}
                                  onWatchLater={onWatchLater}
                                  onPlay={onPlay}
                              />
                              : <TvShow
                                  movie={movie}
                                  trailer={trailer}
                                  noTrailer={noTrailer}
                                  user={props.user}
                                  isFavourite={isFavourite}
                                  isWatched={watchList}
                                  toWatch={watchLater}
                                  onFavourite={onFavourite}
                                  onWatchlist={onWatchlist}
                                  onWatchLater={onWatchLater}
                                  onPlay={onPlay}
                              />
                      }
                  </Container>
              </>
          )
          : (<Container fluid className="d-flex justify-content-center align-items-center vh-100 loading">
              <Spinner
                  animation="border"
                  role="status"
                  style={{color: 'red'}}
              >
              </Spinner>
          </Container>)
    );
}

function Movie(props) {

    return (
        <Container className="d-flex flex-column bg-opacity-75 main-container align-items-center mb-5" style={{backgroundColor: "rgb(0,0,0,0.6)"}}>
            <Container className="mt-3">
                <h1 className="text-white main-banner-title mt-3">{
                    containsNonLatinChars(props.movie.title) ? props.movie.name : props.movie.title
                }</h1>
            </Container>
            {props.noTrailer && <Container className="mt-5">
                {props.trailer ? (
                    <iframe
                        src={props.trailer}
                        className="main-banner-video"
                        width="100%"
                        allowFullScreen
                        title="Movie Trailer"
                        style={{marginBottom: '20px'}}
                    ></iframe>
                ) : (<Loading/>)}
            </Container>}
            <Container className="mt-2">
                {props.movie.genres_ids.map((genre, index) => (
                    <span key={index} className="categories badge bg-danger me-2 opacity-75">{genre.name}</span>
                ))}
            </Container>
            <Container className="mt-3">
                <h5 className="text-white main-banner-description">
                    {props.movie.overview}
                </h5>
            </Container>
            <Row className="main-banner-controls bg-transparent my-5 d-flex justify-content-center gap-4">
                <Col xs="auto">
                    <Button onClick={props.onPlay} variant="light" className="d-flex align-items-center px-3">
                        <i className="bi bi-play-fill fs-2"></i>
                        <h4 className="text-dark mb-0 d-none d-md-inline">Play</h4>
                    </Button>
                </Col>
                {
                    props.user && (
                        <>
                            <Col xs="auto">
                                <Button onClick={props.onWatchLater} variant={props.toWatch ? "danger" : "light"}
                                        className="d-flex align-items-center px-3">
                                    <i className={`bi bi-clock-fill fs-2 ${props.toWatch ? "text-light" : "text-danger"}`}></i>
                                    <h4 className={`${props.toWatch ? "text-light" : "text-dark"} mb-0 d-none d-md-inline mx-1`}>Watch Later</h4>
                                </Button>
                            </Col>
                            <Col xs="auto">
                                <Button onClick={props.onWatchlist} variant={props.isWatched ? "danger" : "light"}
                                        className="d-flex align-items-center px-3">
                                    <i className={`bi bi-eye-fill fs-2 ${props.isWatched ? "text-light" : "text-danger"}`}></i>
                                    <h4 className={`${props.isWatched ? "text-light" : "text-dark"} mb-0 d-none d-md-inline mx-1`}>Watchlist</h4>
                                </Button>
                            </Col>
                            <Col xs="auto">
                                <Button onClick={props.onFavourite} variant={props.isFavourite ? "danger" : "light"}
                                        className="d-flex align-items-center px-3">
                                    <i className={`bi fs-2 ${props.isFavourite ? "text-light bi-star-fill" : "text-danger bi-star"}`}></i>
                                    <h4 className={`${props.isFavourite ? "text-light" : "text-dark"} mb-0 d-none d-md-inline mx-1`}>Favourites</h4>
                                </Button>
                            </Col>
                        </>
                    )
                }
            </Row>
        </Container>
    );
}

function TvShow(props) {
    const isSmartTV = /SmartTV|HbbTV|VIDAA|Web0S|Tizen|X11; Linux armv7l/.test(navigator.userAgent);
    const [currentSeason, setCurrentSeason] = useState(props.movie.seasons[0]);
    const [showArrows, setShowArrows] = useState(false);

    const handleSeasonChange = (seasonNumber) => {
        setCurrentSeason(props.movie.seasons[seasonNumber - 1]);
    }

    useGSAP(() => {
        gsap.from('.tv-title', {
            opacity: 0,
            x: 100,
            duration: 0.7
        })
        gsap.from('.tv-season', {
            opacity: 0,
            x: 100,
            duration: 0.7,
            delay: 0.3
        })
        gsap.from('.no-scrollbar', {
            opacity: 0,
            y: 100,
            duration: 0.7,
            delay: 0.3
        })
    })

    const scrollLeft = () => {
        const scrollContainer = document.getElementsByClassName("episodes")[0];
        scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        const scrollContainer = document.getElementsByClassName("episodes")[0];
        scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
    };


    return (
        <Container fluid className="min-vh-100" style={{ backgroundColor: "rgb(0,0,0,0.7)", overflowX: "hidden"}}>
            <Container fluid className="mt-3 mx-3">
                <h1 className="text-white tv-title">{
                    !containsNonLatinChars(props.movie.title) ? props.movie.name : props.movie.title
                }</h1>
            </Container>
            <Container fluid className={`${props.user && "d-flex flex-wrap justify-content-xl-around justify-content-center"} mt-3 mx-3`}>
                <Dropdown className="tv-season" style={{ position: 'relative', zIndex: 1050 }} align="start" onSelect={(eventKey) => handleSeasonChange(eventKey)}>
                    <Dropdown.Toggle variant="dark" className="py-3 px-5 custom-toggle d-flex align-items-center">
                        <h3 className="mb-0">Season {currentSeason.season_number}</h3>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="mt-1 bg-dark">
                        {props.movie.seasons.map((season, index) => (
                            <Dropdown.Item eventKey={season.season_number} key={index} className="text-white dropdown-item">
                                <h5>Season {season.season_number}</h5>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                {
                    props.user && (
                        <Container className="d-flex justify-content-center mt-2 tv-season">
                            <Button onClick={props.onWatchLater} variant={props.toWatch ? "danger" : "light"}
                                    className="d-flex align-items-center px-3">
                                <i className={`bi bi-clock-fill fs-2 ${props.toWatch ? "text-light" : "text-danger"}`}></i>
                                <h4 className={`${props.toWatch ? "text-light" : "text-dark"} mb-0 d-none d-md-inline mx-1`}>Watch Later</h4>
                            </Button>
                            <Button onClick={props.onWatchlist} variant={props.isWatched ? "danger" : "light"}
                                    className="d-flex align-items-center px-3 mx-5">
                                <i className={`bi bi-eye-fill fs-2 ${props.isWatched ? "text-light" : "text-danger"}`}></i>
                                <h4 className={`${props.isWatched ? "text-light" : "text-dark"} mb-0 d-none d-md-inline mx-1`}>Watchlist</h4>
                            </Button>
                            <Button onClick={props.onFavourite} variant={props.isFavourite ? "danger" : "light"}
                                    className="d-flex align-items-center px-3 ml-5">
                                <i className={`bi fs-2 ${props.isFavourite ? "text-light bi-star-fill" : "text-danger bi-star"}`}></i>
                                <h4 className={`${props.isFavourite ? "text-light" : "text-dark"} mb-0 d-none d-md-inline mx-1`}>Favourites</h4>
                            </Button>
                        </Container>
                    )
                }
            </Container>
            <Container fluid className="mt-3 no-scrollbar episodes">
                <div className="d-flex">
                    {currentSeason.episodes.map((episode, index) => (
                        <EpisodeCard
                            key={index}
                            onPlay={props.onPlay}
                            season={currentSeason.season_number}
                            episode={episode}
                            movie={props.movie}
                        />
                    ))}
                </div>
            </Container>
            {
                isSmartTV
                    ? (
                        <>
                            <div
                                style={{
                                    color: 'white',
                                    backgroundColor: 'black',
                                }}
                                className="tv-scroll-left"
                                onClick={scrollLeft}>
                                &#10094;
                            </div>
                            <div
                                style={{
                                    color: 'white',
                                    backgroundColor: 'black',
                                }}
                                className="tv-scroll-right"
                                onClick={scrollRight}>
                                &#10095;
                            </div>
                        </>
                    )
                    : (
                        <>
                            <div
                                onMouseEnter={() => setShowArrows(true)}
                                onMouseLeave={() => setShowArrows(false)}
                                style={showArrows ? {
                                    color: 'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                } : {
                                    color: 'transparent',
                                    backgroundColor: 'transparent',
                                }}
                                className="tv-scroll-left"
                                onClick={scrollLeft}>
                                &#10094;
                            </div>
                            <div
                                onMouseEnter={() => setShowArrows(true)}
                                onMouseLeave={() => setShowArrows(false)}
                                style={showArrows ? {
                                    color: 'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                } : {
                                    color: 'transparent',
                                    backgroundColor: 'transparent',
                                }}
                                className="tv-scroll-right"
                                onClick={scrollRight}>
                                &#10095;
                            </div>
                        </>
                    )
            }
        </Container>
    );
}

export default MovieDetails;
