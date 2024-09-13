import EpisodeCard from "./EpisodeCard.jsx";

{/*eslint-disable react/prop-types*/}
import {Button, Col, Container, Dropdown, Navbar, Row, Spinner} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";
import {useEffect, useState} from "react";
import Loading from "../Miscs/Loading.jsx";
import {db} from "../../../firebaseConfiguration.js";
import {collection, doc, addDoc, deleteDoc, query, where, getDocs} from "firebase/firestore";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {containsNonLatinChars} from "../../helper/miscs.js";

function MovieDetails(props) {
    const fetcher = new FetchedMovieController();
    const navigate = useNavigate();
    const {mediaType, movieId} = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState('');
    const [noTrailer, setNoTrailer] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    const [toWatch, setToWatch] = useState(false);
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

        const getUserPresonalData = async () => {
            const userDocRef = doc(db, 'users', props.user.uid);

            try {
                const favouritesSnapshot = await getDocs(collection(userDocRef, 'favourites'));
                const watchedSnapshot = await getDocs(collection(userDocRef, 'watched'));
                const toWatchSnapshot = await getDocs(collection(userDocRef, 'toWatch'));

                const favourites = favouritesSnapshot.docs.map(doc => doc.data());
                const watched = watchedSnapshot.docs.map(doc => doc.data());
                const toWatch = toWatchSnapshot.docs.map(doc => doc.data());

                favourites.map(favourite => {
                    favourite.movieId === movieId ? setIsFavourite(true) : setIsFavourite(false);
                });

                watched.map(watched => {
                    watched.movieId === movieId ? setIsWatched(true) : setIsWatched(false);
                });

                toWatch.map(toWatch => {
                    toWatch.movieId === movieId ? setToWatch(true) : setToWatch(false);
                });

            } catch (error) {
                console.error('Error fetching user collections:', error);
            }
        }
        props.user && getUserPresonalData();
    }, [props.user]);

    useEffect(() => {
        if (playMovieSplash) {
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
        if (props.user) {
            try {
                const userDocRef = doc(db, 'users', props.user.uid);
                const favouritesRef = collection(userDocRef, 'favourites');

                const favouritesQuery = query(favouritesRef, where("movieId", "==", movie.id.toString()));
                const favouritesSnapshot = await getDocs(favouritesQuery);

                if (!favouritesSnapshot.empty) {
                    await deleteDoc(favouritesSnapshot.docs[0].ref);
                    setIsFavourite(false);
                } else {
                    await addDoc(favouritesRef, { movieId: movie.id.toString(), mediaType: mediaType });
                    setIsFavourite(true);
                }
            } catch (error) {
                console.error("Error managing favourites: ", error);
            }
        } else {
            console.log("User not authenticated.");
        }
    };

    const onWatchlist = async () => {
        if (props.user) {
            try {
                const userDocRef = doc(db, 'users', props.user.uid);
                const watchedRef = collection(userDocRef, 'watched');
                const toWatchRef = collection(userDocRef, 'toWatch');

                const watchedQuery = query(watchedRef, where("movieId", "==", movie.id.toString()));
                const watchedSnapshot = await getDocs(watchedQuery);

                if (!watchedSnapshot.empty) {
                    await deleteDoc(watchedSnapshot.docs[0].ref);
                    setIsWatched(false);
                } else {
                    const toWatchQuery = query(toWatchRef, where("movieId", "==", movie.id.toString()));
                    const toWatchSnapshot = await getDocs(toWatchQuery);

                    if (!toWatchSnapshot.empty) {
                        await deleteDoc(toWatchSnapshot.docs[0].ref);
                        setToWatch(false);
                    }
                    await addDoc(watchedRef, { movieId: movie.id.toString(), mediaType: mediaType });
                    setIsWatched(true);
                }
            } catch (error) {
                console.error("Error managing watched: ", error);
            }
        } else {
            console.log("User not authenticated.");
        }
    };


    const onWatchLater = async () => {
        if (props.user) {
            try {
                const userDocRef = doc(db, 'users', props.user.uid);
                const toWatchRef = collection(userDocRef, 'toWatch');
                const watchedRef = collection(userDocRef, 'watched');

                const toWatchQuery = query(toWatchRef, where("movieId", "==", movie.id.toString()));
                const toWatchSnapshot = await getDocs(toWatchQuery);

                if (!toWatchSnapshot.empty) {
                    await deleteDoc(toWatchSnapshot.docs[0].ref);
                    setToWatch(false);
                } else {
                    const watchedQuery = query(watchedRef, where("movieId", "==", movie.id.toString()));
                    const watchedSnapshot = await getDocs(watchedQuery);

                    if (!watchedSnapshot.empty) {
                        await deleteDoc(watchedSnapshot.docs[0].ref);
                        setIsWatched(false);
                    }

                    await addDoc(toWatchRef, { movieId: movie.id.toString(), mediaType: mediaType });
                    setToWatch(true);
                }
            } catch (error) {
                console.error("Error managing toWatch: ", error);
            }
        } else {
            console.log("User not authenticated.");
        }
    };

    useGSAP(() => {
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
                                  isWatched={isWatched}
                                  toWatch={toWatch}
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
                                  isWatched={isWatched}
                                  toWatch={toWatch}
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
                        <EpisodeCard key={index} onPlay={props.onPlay} season={currentSeason.season_number} episode={episode} />
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
