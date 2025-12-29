/* eslint-disable react/prop-types */
import logo from "../../assets/images/logo.png";
import {useEffect, useState} from "react";
import {Container, Nav, Navbar, Spinner} from "react-bootstrap";
import GridMovies from "../Movies/GridMovies.jsx";
import smallLogo from "../../assets/images/titleLogo.png";
import {useNavigate} from "react-router-dom";

function PersonalMovies(props) {
    const navigate = useNavigate();
    const [screen, setScreen] = useState('desktop');

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

    const handleMovieTypeSelection = (type) => {
        navigate(`/${type}`);
    };

    const getMoviesToDisplay = () => {
        if (!props.userMovies) return [];

        let selectedList;

        if (props.type === "favourites") {
            selectedList = props.userMovies.favourites;
        } else if (props.type === "watchLater") {
            selectedList = props.userMovies.watchLater;
        } else {
            selectedList = props.userMovies.watchlist;
        }

        return selectedList || [];
    };

    const moviesToDisplay = getMoviesToDisplay();

    return (
        <Container fluid className="min-vh-100 bg-gradient-dark-radius main-banner overflow-x-hidden">
            <Navbar className="bg-gradient-dark-radius">
                <Container fluid className="justify-content-start">
                    <Navbar.Brand href="/movies" className="p-4">
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
                !props.userMovies
                    ? <Container fluid className="d-flex flex-column justify-content-center align-items-center h-100">
                        <Spinner animation="border" variant="danger" />
                    </Container>
                    : <Container fluid className="mx-2">
                        <h2 className="text-white mt-5 mx-3">
                            {props.type === "favourites" ? "Favourites" : props.type === "watchLater" ? "Watch Later" : "Watchlist"}
                        </h2>
                        <GridMovies movies={moviesToDisplay} type={props.type} />
                    </Container>
            }
        </Container>
    );
}

export default PersonalMovies;