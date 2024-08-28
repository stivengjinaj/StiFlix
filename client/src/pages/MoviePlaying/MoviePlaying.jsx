import {useEffect, useRef, useState} from "react";
import FetchLinksController from "../../controllers/FetchLinksController.js";
import {useParams} from "react-router-dom";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";
import {getYearFromDate} from "../../helper/miscs.js";
import Loading from "../Movies/Loading.jsx";
import {Container, Dropdown} from "react-bootstrap";

function MoviePlaying() {
    const iframeRef = useRef(null);
    const { mediaType, movieId, season, episode } = useParams();
    const linkFetcher = new FetchLinksController();
    const movieFetcher = new FetchedMovieController();
    const [movie, setMovie] = useState(null);
    const [links, setLinks] = useState([]);
    const [currentServer, setCurrentServer] = useState(null);
    const [noLinks, setNoLinks] = useState(false);

    useEffect(() => {
        const fetchLinks = async (fetchedMovie) => {
            let response = [];

            if (mediaType === 'movie') {
                response = await linkFetcher.fetchAllLinks(
                    fetchedMovie.title,
                    mediaType,
                    getYearFromDate(fetchedMovie.release_date),
                    movieId
                );
            } else {
                response = await linkFetcher.fetchTvShowSpecific(
                    fetchedMovie.title,
                    mediaType,
                    getYearFromDate(fetchedMovie.release_date),
                    movieId,
                    season,
                    episode
                );
            }

            const validLinks = response.filter(link => link.error === null);

            if (validLinks.length > 0) {
                setLinks(validLinks);

                setCurrentServer(validLinks[0]);
            } else {
                setNoLinks(true);
            }
        };

        const movieDetails = async () => {
            try {
                const fetchedMovie = await movieFetcher.getMediaDetails(movieId, mediaType);
                setMovie(fetchedMovie);
                await fetchLinks(fetchedMovie);
            } catch (error) {
                setNoLinks(true);
            }
        };

        movieDetails();
    }, [mediaType, movieId, season, episode]);

    const handleServerChange = (server) => {
        const selectedServer = links.find(link => link.server === server);
        setCurrentServer(selectedServer);
    };

    return (
        noLinks
            ? (
                <Container fluid className="d-flex justify-content-center align-items-center bg-gradient-dark-radius" style={{ height: '100vh' }}>
                    <h1>Movie not found. We are sorry :(</h1>
                </Container>
            )
            : (
                links.length === 0
                    ? <Loading />
                    : <Container fluid className="p-0 video-container">
                        <Container fluid className="d-flex dropdown-wrapper justify-content-between">
                            <Dropdown
                                className="mx-3"
                                style={{ position: 'relative', zIndex: 1060 }}
                                align="start"
                                onSelect={(eventKey) => handleServerChange(eventKey)}
                            >
                                <Dropdown.Toggle variant="dark" id="dropdown-basic" className="select-server p-3">
                                    <h4 className="mb-0">{currentServer ? currentServer.server : 'Select Server'}</h4>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="mt-1 bg-dark">
                                    {links.filter(link => link.server !== currentServer.server).map((link, index) => (
                                        <Dropdown.Item key={index} eventKey={link.server} className="text-white dropdown-item">
                                            {link.server}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>
                        {currentServer && (
                            <iframe
                                ref={iframeRef}
                                className="video"
                                src={currentServer.link}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                style={{ width: '100%', height: '100%', border: 'none' }}
                            ></iframe>
                        )}
                    </Container>
            )
    );
}

export default MoviePlaying;

