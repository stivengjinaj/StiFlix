import {collection, doc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore";

{/*eslint-disable react/prop-types*/}
import {useEffect, useRef, useState} from "react";
import FetchLinksController from "../../controllers/FetchLinksController.js";
import {useNavigate, useParams} from "react-router-dom";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";
import {getCurrentDateString} from "../../helper/miscs.js";
import Loading from "../Miscs/Loading.jsx";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
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
            let links = linkFetcher.fetchAllLinks(fetchedMovie.isSeries ? 'tv' : 'movie', fetchedMovie.id, parseInt(season), parseInt(currentEpisode));
            setLinks(links);
            setCurrentServer(links[0]);
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
    };

    return (
        noLinks
            ? (
                <Container fluid className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', background: 'linear-gradient(135deg, #141414 0%, #000000 100%)' }}>
                    <h1 className="text-white text-center mb-4">Movie not found. We are sorry :(</h1>
                    <h3 className="text-white-50 text-center">Stiflix does not have control over the movies. It is just a friendly app that points you to where the movies are.</h3>
                </Container>
            )
            : (
                links.length === 0
                    ? <Loading />
                    : <Container fluid className="p-0 d-flex flex-column" style={{ backgroundColor: '#212121', minHeight: '100vh' }}>
                        <div className="w-100 py-3 px-4 d-flex flex-row align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <Dropdown
                                    style={{ position: 'relative', zIndex: 100}}
                                    align="start"
                                    onSelect={(eventKey) => handleServerChange(eventKey)}
                                >
                                    <Dropdown.Toggle
                                        className="d-flex align-items-center px-3 py-2 border-0 text-white fw-semibold"
                                        style={{
                                            background: 'rgba(229, 9, 20, 0.1)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(229, 9, 20, 0.3)',
                                            borderRadius: '4px',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <div
                                            className="me-2 d-flex align-items-center justify-content-center"
                                            style={{
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#e50914',
                                                borderRadius: '50%'
                                            }}
                                        ></div>
                                        {currentServer ? currentServer.server : 'Select Server'}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu
                                        className="mt-2 border-0 shadow-lg"
                                        style={{
                                            background: 'rgba(42, 42, 42, 0.95)',
                                            backdropFilter: 'blur(20px)',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        {links.filter(link => link.server !== currentServer.server).map((link, index) => (
                                            <Dropdown.Item
                                                key={index}
                                                eventKey={link.server}
                                                className="text-white bg-transparent border-0 py-3 px-4 server-dropdown-item"
                                            >
                                                {link.server}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <div className="text-center flex-grow-1">
                                <h1 className="text-white mb-0 fw-bold" style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
                                    {movie.title}
                                </h1>
                            </div>

                            {movie.isSeries && (
                                <div className="d-flex align-items-center">
                                    {!(parseInt(season) === 1 && parseInt(episode) === 1) &&
                                        <button
                                            onClick={handlePreviousEpisode}
                                            className="btn border-0 text-white d-flex align-items-center justify-content-center ms-2"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '50%',
                                            }}
                                        >
                                            <i className="bi bi-skip-backward-fill"></i>
                                        </button>
                                    }
                                    {!lastEpisodeSeason &&
                                        <button
                                            onClick={handleNextEpisode}
                                            className="btn border-0 text-white d-flex align-items-center justify-content-center me-2"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '50%',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <i className="bi bi-skip-forward-fill"></i>
                                        </button>
                                    }
                                    <button
                                        onClick={() => setChangeSeasonEpisode(true)}
                                        className="btn border-0 text-white fw-semibold px-4 py-2 d-flex align-items-center"
                                        style={{
                                            background: 'linear-gradient(90deg, #e50914 0%, #b8070f 100%)',
                                            borderRadius: '4px',
                                            fontSize: '0.95rem',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 2px 8px rgba(229, 9, 20, 0.3)'
                                        }}
                                    >
                                        <i className="bi bi-collection-play"></i>
                                        {props.screenWidth > 900 && <span className="ms-2">Season {season}</span>}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex-grow-1 d-flex flex-column justify-content-center py-5">
                            <Container>
                                <Row className="justify-content-center">
                                    <Col lg={10} xl={9}>
                                        {currentServer && (
                                            <div
                                                className="position-relative shadow-lg overflow-hidden"
                                                style={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                                                }}
                                            >
                                                <div className="ratio ratio-16x9">
                                                    <iframe
                                                        ref={iframeRef}
                                                        src={currentServer.link}
                                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                                        style={{ borderRadius: '8px' }}
                                                    ></iframe>
                                                </div>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                        {movie.isSeries &&
                            <ChangeSeasonEpisode
                                movie={movie}
                                season={season}
                                show={changeSeasonEpisode}
                                hide={() => setChangeSeasonEpisode(false)}
                                onHide={() => setChangeSeasonEpisode(false)}
                            />
                        }
                    </Container>
            )
    );
}

export default MoviePlaying;

