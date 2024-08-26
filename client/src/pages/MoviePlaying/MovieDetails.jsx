{/*eslint-disable react/prop-types*/}
import {Button, Col, Container, Navbar, Row, Spinner} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";
import {useEffect, useState} from "react";
import Loading from "../Movies/Loading.jsx";
import {db} from "../../../firebaseConfiguration.js";
import {collection, doc, addDoc, deleteDoc, query, where, getDocs} from "firebase/firestore";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

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
                    navigate(`/movies/${movie.id}`);
                }
            });
        }
    }, [playMovieSplash, navigate]);

    const onPlay = () => {
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
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'black',
                      zIndex: playMovieSplash ? 1000 : -1,
                  }}></div>
                  <Container fluid className="movie-details w-100 p-0 min-vh-100" style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                      backgroundColor: "black"
                  }}>
                      <Navbar className="bg-gradient-dark">
                          <Navbar.Brand>
                              <Button variant="transparent" onClick={() => navigate('/movies')}>
                                  <strong><i className="bi bi-arrow-left text-white h1"></i></strong>
                              </Button>
                          </Navbar.Brand>
                      </Navbar>
                      <Container className="rounded-4 bg-opacity-75 main-container" style={{backgroundColor: "rgb(0,0,0,0.6)"}}>
                          <Container className="mt-5">
                              <h1 className="text-white main-banner-title mt-5">{movie.title}</h1>
                          </Container>
                          {noTrailer && <Container className="mt-5">
                              {trailer ? (
                                  <iframe
                                      src={trailer}
                                      className="main-banner-video"
                                      width="100%"
                                      height="400"
                                      allowFullScreen
                                      title="Movie Trailer"
                                      style={{marginBottom: '20px'}}
                                  ></iframe>
                              ) : (<Loading/>)}
                          </Container>}
                          <Container className="mt-2">
                              {movie.genres_ids.map((genre, index) => (
                                  <span key={index} className="categories badge bg-danger me-2 opacity-75">{genre.name}</span>
                              ))}
                          </Container>
                          <Container className="mt-3">
                              <h5 className="text-white main-banner-description">
                                  {movie.overview}
                              </h5>
                          </Container>
                          <Row className="main-banner-actions my-5 d-flex justify-content-center gap-4">
                              <Col xs="auto">
                                  <Button onClick={onPlay} variant="light" className="d-flex align-items-center px-3">
                                      <i className="bi bi-play-fill fs-2"></i>
                                      <h4 className="text-dark mb-0 d-none d-md-inline">Play</h4>
                                  </Button>
                              </Col>
                              {
                                  props.user && (
                                      <>
                                          <Col xs="auto">
                                              <Button onClick={onWatchLater} variant={toWatch ? "danger" : "light"}
                                                      className="d-flex align-items-center px-3">
                                                  <i className={`bi bi-clock-fill fs-2 ${toWatch ? "text-light" : "text-danger"}`}></i>
                                                  <h4 className={`${toWatch ? "text-light" : "text-dark"} mb-0 d-none d-md-inline mx-1`}>Watch Later</h4>
                                              </Button>
                                          </Col>
                                          <Col xs="auto">
                                              <Button onClick={onWatchlist} variant={isWatched ? "danger" : "light"}
                                                      className="d-flex align-items-center px-3">
                                                  <i className={`bi bi-eye-fill fs-2 ${isWatched ? "text-light" : "text-danger"}`}></i>
                                                  <h4 className={`${isWatched ? "text-light" : "text-dark"} mb-0 d-none d-md-inline mx-1`}>Watchlist</h4>
                                              </Button>
                                          </Col>
                                          <Col xs="auto">
                                              <Button onClick={onFavourite} variant={isFavourite ? "danger" : "light"}
                                                      className="d-flex align-items-center px-3">
                                                  <i className={`bi fs-2 ${isFavourite ? "text-light bi-star-fill" : "text-danger bi-star"}`}></i>
                                                  <h4 className={`${isFavourite ? "text-light" : "text-dark"} mb-0 d-none d-md-inline mx-1`}>Favourites</h4>
                                              </Button>
                                          </Col>
                                      </>
                                  )
                              }
                          </Row>

                      </Container>
                  </Container>
              </>
          )
          : (<Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-dark">
              <Spinner
                  animation="border"
                  role="status"
                  style={{ color: 'red' }}
              >
              </Spinner>
          </Container>)
    );
}

export default MovieDetails;