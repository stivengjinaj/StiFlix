import {collection, doc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore";

{/*eslint-disable react/prop-types*/}
import {useEffect, useRef, useState} from "react";
import FetchLinksController from "../../controllers/FetchLinksController.js";
import {useNavigate, useParams} from "react-router-dom";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";
import {containsNonLatinChars, getCurrentDateString, getYearFromDate} from "../../helper/miscs.js";
import Loading from "../Miscs/Loading.jsx";
import {Button, Container, Dropdown} from "react-bootstrap";
import {db} from "../../../firebaseConfiguration.js";
import ChangeSeasonEpisode from "./ChangeSeasonEpisode.jsx";

function MoviePlaying(props) {
    const navigate = useNavigate();
    const iframeRef = useRef(null);
    const { mediaType, movieId, season, episode } = useParams();
    const [currentEpisode, setCurrentEpisode] = useState(episode);
    const linkFetcher = new FetchLinksController();
    const movieFetcher = new FetchedMovieController();
    const [movie, setMovie] = useState(null);
    const [links, setLinks] = useState([]);
    const [currentServer, setCurrentServer] = useState(null);
    const [noLinks, setNoLinks] = useState(false);
    const [changeSeasonEpisode, setChangeSeasonEpisode] = useState(false);
    const [lastEpisodeSeason, setLastEpisodeSeason] = useState(false);

    const handleProgressSave = async () => {
        if (props.user && movieId) {
            try {
                const userDocRef = doc(db, 'users', props.user.uid);
                const continueWatchingCollection = collection(userDocRef, 'continueWatching');

                const querySnapshot = await getDocs(query(continueWatchingCollection, where('movieId', '==', String(movieId))));

                if (querySnapshot.empty) {
                    await setDoc(doc(continueWatchingCollection), {
                        movieId: String(movieId),
                        mediaType: mediaType,
                        season: mediaType === 'tv' ? season : 1,
                        episode: mediaType === 'tv' ? episode : 1,
                        date: getCurrentDateString(),
                    });
                } else if (mediaType === 'tv') {
                    const docRef = querySnapshot.docs[0].ref;
                    await updateDoc(docRef, {
                        season: season,
                        episode: episode,
                        date: getCurrentDateString(),
                    });
                }
            } catch (error) {
                console.error('Error handling progress save:', error);
            }
        }
    };

    useEffect(() => {
        if (props.user) {
            const countdownId = setTimeout(handleProgressSave, 60000);

            return () => clearTimeout(countdownId);
        }
    }, [currentServer]);

    useEffect(() => {
        const fetchLinks = async (fetchedMovie) => {
            let response = [];
            const mediaTitle = !containsNonLatinChars(fetchedMovie.title) ? fetchedMovie.name : fetchedMovie.title;
            if (mediaType === 'movie') {
                response = await linkFetcher.fetchAllLinks(
                    mediaTitle ? encodeURIComponent(encodeURIComponent(mediaTitle)) : fetchedMovie.title,
                    mediaType,
                    getYearFromDate(fetchedMovie.release_date),
                    movieId
                );
            } else {
                response = await linkFetcher.fetchTvShowSpecific(
                    mediaTitle ? encodeURIComponent(encodeURIComponent(mediaTitle)) : fetchedMovie.title,
                    mediaType,
                    getYearFromDate(fetchedMovie.release_date),
                    movieId,
                    season,
                    episode
                );
            }

            let validLinks = response.filter(link => link.error === null);
            if (validLinks.length > 0) {
                validLinks = validLinks.sort((a, b) => a.server.localeCompare(b.server));
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
                if (mediaType === 'tv') {
                    setLastEpisodeSeason(parseInt(season) === fetchedMovie.seasons.length && parseInt(episode) === fetchedMovie.seasons[parseInt(season) - 1].episodes.length);
                }
                await fetchLinks(fetchedMovie);
            } catch (error) {
                setNoLinks(true);
            }
        };

        movieDetails();

    }, [currentEpisode]);

    const handleServerChange = (server) => {
        const selectedServer = links.find(link => link.server === server);
        setCurrentServer(selectedServer);
    };

    const handleNextEpisode = () => {
        const lastEpisode = movie.seasons[season - 1].episodes.length;
        if (parseInt(episode) < lastEpisode) {
            setCurrentEpisode(String(parseInt(episode) + 1));
            setLinks([]);
            navigate(`/tv/${movie.id}/${season}/${parseInt(episode) + 1}`);
        } else {
            if (parseInt(season) < movie.seasons.length) {
                setCurrentEpisode("1");
                setLinks([]);
                navigate(`/tv/${movie.id}/${parseInt(season) + 1}/1`);
            }
        }
    };

    const handlePreviousEpisode = () => {
        if (parseInt(episode) > 1) {
            setCurrentEpisode(String(parseInt(episode) - 1));
            setLinks([]);
            navigate(`/tv/${movie.id}/${season}/${parseInt(episode) - 1}`);
        } else {
            if (parseInt(season) > 1) {
                setCurrentEpisode(String(movie.seasons[parseInt(season) - 2].episodes.length));
                setLinks([]);
                navigate(`/tv/${movie.id}/${parseInt(season) - 1}/${movie.seasons[parseInt(season) - 2].episodes.length}`);
            }
        }
    }

    return (
        noLinks
            ? (
                <Container fluid className="d-flex flex-column justify-content-center align-items-center bg-gradient-dark-radius" style={{ height: '100vh' }}>
                    <h1 className="text-white text-center">Movie not found. We are sorry :(</h1>
                    <h3 className="text-white text-center">Stiflix does not have control over the movies. It is just a friendly app that points you to where the movies are.</h3>
                </Container>
            )
            : (
                links.length === 0
                    ? <Loading />
                    : <Container fluid className="p-0 video-container">
                        <Container fluid className="d-flex dropdown-wrapper justify-content-between">
                            <Dropdown
                                className="mx-3"
                                style={{ position: 'relative', zIndex: 1060}}
                                align="start"
                                onSelect={(eventKey) => handleServerChange(eventKey)}
                            >
                                <Dropdown.Toggle variant="dark" id="dropdown-basic" className="select-server p-3">
                                    <h4 className="mb-0">{currentServer ? currentServer.server : 'Select Server'}</h4>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="mt-1 bg-dark">
                                    {links.filter(link => link.server !== currentServer.server).map((link, index) => (
                                        <Dropdown.Item key={index} eventKey={link.server} className="text-white dropdown-item">
                                            {link.server === "Omega" ? "Omega (Ads)" : link.server}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            {
                                movie.isSeries &&
                                (
                                    <div>
                                        {(parseInt(episode) >= 1 && parseInt(season) !== 1) && <Button onClick={handlePreviousEpisode} variant="outline-light" className="rounded rounded-5 px-4"><i className="bi bi-arrow-left"></i></Button>}
                                        {!lastEpisodeSeason && <Button onClick={handleNextEpisode} variant="outline-light" className="rounded rounded-5 px-4 mx-3"><i className="bi bi-arrow-right"></i></Button>}
                                        <Button onClick={() => setChangeSeasonEpisode(true)} variant="dark" className="p-3 mx-3">
                                            <h5>{`Season ${season}`}</h5>
                                        </Button>
                                    </div>
                                )
                            }
                        </Container>
                        {currentServer && (
                            <>
                            <iframe
                                ref={iframeRef}
                                className="video"
                                src={currentServer.link}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                style={{ width: '100%', height: '100%', border: 'none' }}
                            ></iframe>
                                {movie.isSeries &&
                                    <ChangeSeasonEpisode
                                    movie={movie}
                                    season={season}
                                    show={changeSeasonEpisode}
                                    hide={() => setChangeSeasonEpisode(false)}
                                    onHide={() => setChangeSeasonEpisode(false)}
                                    />
                                }
                            </>
                        )}
                    </Container>
            )
    );
}

export default MoviePlaying;

