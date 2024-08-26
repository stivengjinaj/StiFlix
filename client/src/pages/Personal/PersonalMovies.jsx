import Loading from "../Movies/Loading.jsx";

{/* eslint-disable react/prop-types */}
import logo from "../../assets/images/logo.png";
import {useEffect, useState} from "react";
import {db} from "../../../firebaseConfiguration.js";
import {collection, doc, getDocs} from "firebase/firestore";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import GridMovies from "../Movies/GridMovies.jsx";
import smallLogo from "../../assets/images/titleLogo.png";
import {useNavigate} from "react-router-dom";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";

function PersonalMovies(props) {
    const navigate = useNavigate();
    const [screen, setScreen] = useState('desktop');
    const movieFetcher = new FetchedMovieController();
    const [favourites, setFavourites] = useState([]);
    const [watchLater, setWatchLater] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noMovies, setNoMovies] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setScreen('mobile');
            } else {
                setScreen('desktop');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchMovies = async (usr) => {
            if (usr) {
                setNoMovies(false);
                setLoading(true);

                const userDocRef = doc(db, 'users', usr.uid);
                let snapshot;
                let movies = [];

                try {
                    switch (props.type) {
                        case "watchLater":
                            snapshot = await getDocs(collection(userDocRef, 'toWatch'));
                            break;
                        case "watchlist":
                            snapshot = await getDocs(collection(userDocRef, 'watched'));
                            break;
                        case "favourites":
                            snapshot = await getDocs(collection(userDocRef, 'favourites'));
                            break;
                        default:
                            return;
                    }

                    const moviePromises = snapshot.docs.map((doc) => movieFetcher.getMediaDetails(doc.data().movieId));
                    movies = await Promise.all(moviePromises);

                    switch (props.type) {
                        case "watchLater":
                            setWatchLater(movies);
                            break;
                        case "watchlist":
                            setWatchlist(movies);
                            break;
                        case "favourites":
                            setFavourites(movies);
                            break;
                        default:
                            return;
                    }

                    if (movies.length === 0) {
                        setNoMovies(true);
                    }
                } catch (error) {
                    console.error("Error fetching movies:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (props.user) {
            fetchMovies(props.user);
        }
    }, [props.user, props.type]);




    useEffect(() => {
        favourites.length > 0
            ? setLoading(false)
            : watchLater.length > 0
                ? setLoading(false)
                : watchlist.length > 0
                    ? setLoading(false)
                    : setLoading(true)
    }, [favourites, watchlist, watchLater]);

    const handleMovieTypeSelection = (type) => {
        navigate(`/${type}`);
    }


    return (
        <Container fluid className="min-vh-100 bg-gradient-dark-radius main-banner overflow-x-hidden">
            <Navbar className="bg-gradient-dark-radius">
                <Container fluid className="justify-content-start ">
                    <Navbar.Brand>
                        <Button variant="transparent" onClick={() => navigate('/movies')}>
                            <strong>
                                <i className="bi bi-arrow-left text-white h1"></i>
                            </strong>
                        </Button>
                    </Navbar.Brand>
                    <Navbar.Brand href="/movies">
                        {screen === 'desktop' ? (
                            <img src={logo} alt="logo" height={50} width={150} />
                        ) : (
                            <img src={smallLogo} alt="logo" width={25} height={44} />
                        )}
                    </Navbar.Brand>
                    {screen === 'desktop' && (
                        <Nav className="me-auto mt-2">
                            <Nav.Link onClick={() => handleMovieTypeSelection("favourites")} className="text-white">
                                <h5 className={props.type === "favourites" ? "nav-item-selected" : "nav-item"}>Favourites</h5>
                            </Nav.Link>
                            <Nav.Link onClick={() => handleMovieTypeSelection("watchLater")}  className="text-white">
                                <h5 className={props.type === "watchLater" ? "nav-item-selected" : "nav-item"}>Watch
                                    Later</h5>
                            </Nav.Link>
                            <Nav.Link onClick={() => handleMovieTypeSelection("watchlist")}  className="text-white">
                                <h5 className={props.type === "watchlist" ? "nav-item-selected" : "nav-item"}>Watchlist</h5>
                            </Nav.Link>
                        </Nav>
                    )}
                </Container>
            </Navbar>
            {
                screen === 'mobile' && (
                    <Container fluid>
                        <Nav className="justify-content-center">
                            <Nav.Link onClick={() => handleMovieTypeSelection("favourites")}  className="text-white">
                                <h5 className={props.type === "favourites" ? "nav-item-selected" : "nav-item"}>Favourites</h5>
                            </Nav.Link>
                            <Nav.Link onClick={() => handleMovieTypeSelection("watchLater")}  className="text-white">
                                <h5 className={props.type === "watchLater" ? "nav-item-selected" : "nav-item"}>Watch
                                    Later</h5>
                            </Nav.Link>
                            <Nav.Link onClick={() => handleMovieTypeSelection("watchlist")}  className="text-white">
                                <h5 className={props.type === "watchlist" ? "nav-item-selected" : "nav-item"}>Watchlist</h5>
                            </Nav.Link>
                        </Nav>
                    </Container>
                )
            }
            {
                loading
                    ? (
                        <Loading />
                    )
                    : (
                        noMovies
                            ? (
                                <Container fluid className="d-flex justify-content-center bg-gradient-dark-radius">
                                    <h2 className="text-white mt-5 mx-3">
                                        No movies in {props.type === "favourites" ? "Favourites" : props.type === "watchLater" ? "Watch Later" : "Watchlist"}
                                    </h2>
                                </Container>
                            )
                            : (
                                <Container fluid className="mx-2">
                                    <h2 className="text-white mt-5 mx-3">
                                        {props.type === "favourites" ? "Favourites" : props.type === "watchLater" ? "Watch Later" : "Watchlist"}
                                    </h2>
                                    <GridMovies movies={props.type === "favourites" ? favourites : props.type === "watchLater" ? watchLater : watchlist} />
                                </Container>
                            )
                    )
            }
        </Container>
    );
}


export default PersonalMovies;