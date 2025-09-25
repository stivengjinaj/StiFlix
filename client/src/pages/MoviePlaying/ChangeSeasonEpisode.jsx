import EpisodeCard from "./EpisodeCard.jsx";

{/*eslint-disable react/prop-types*/}
import {Col, Container, Dropdown, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


function ChangeSeasonEpisode (props) {
    const navigate = useNavigate();
    const [screen, setScreen] = useState(null);
    const [currentSeason, setCurrentSeason] = useState(props.movie.seasons[props.season - 1]);

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            setScreen("mobile");
        } else {
            setScreen("desktop");
        }
    })

    const handleSeasonChange = (seasonNumber) => {
        setCurrentSeason(props.movie.seasons[seasonNumber - 1]);
    }

    const onChange = (episode) => {
        props.hide();
        navigate(`/tv/${props.movie.id}/${currentSeason.season_number}/${episode}`);
        navigate(0);
    }

    return (
        <Modal {...props} size="xl" centered className="netflix-modal">
            <Modal.Header
                closeButton
                className="border-0"
                style={{background: 'black',}}
            >
                <Modal.Title className="text-white d-flex align-items-center w-100">
                    <div className="d-flex align-items-center">
                        <div
                            className="me-3 d-flex align-items-center justify-content-center"
                            style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #e50914 0%, #b8070f 100%)',
                                borderRadius: '8px'
                            }}
                        >
                            <i className="bi bi-tv text-white" style={{ fontSize: '1.2rem' }}></i>
                        </div>
                        <div>
                            <h3 className="mb-0 fw-bold" style={{ fontSize: '1.5rem' }}>{props.movie.title}</h3>
                            <small style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                                Choose Season & Episode
                            </small>
                        </div>
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body
                className="p-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(20,20,20,0.85), rgba(0,0,0,0.95)), url(https://image.tmdb.org/t/p/original/${screen === "desktop" ? props.movie.backdrop_path : props.movie.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    minHeight: '500px'
                }}
            >
                <Container fluid className="py-4">
                    <Row className="mb-4">
                        <Col className="d-flex justify-content-start">
                            <Dropdown
                                style={{ position: 'relative', zIndex: 1050 }}
                                align="center"
                                onSelect={(eventKey) => handleSeasonChange(eventKey)}
                            >
                                <Dropdown.Toggle
                                    className="px-5 py-3 fw-bold text-white border-0 d-flex align-items-center"
                                    style={{
                                        background: 'linear-gradient(90deg, rgba(229, 9, 20, 0.9) 0%, rgba(184, 7, 15, 0.9) 100%)',
                                        borderRadius: '6px',
                                        fontSize: '1.1rem',
                                        letterSpacing: '0.5px',
                                        boxShadow: '0 4px 15px rgba(229, 9, 20, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <i className="bi bi-collection-play me-3"></i>
                                    SEASON {currentSeason.season_number}
                                </Dropdown.Toggle>

                                <Dropdown.Menu
                                    className="border-0 shadow-lg mt-3"
                                    style={{
                                        background: 'rgba(42, 42, 42, 0.95)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: '10px',
                                        minWidth: '250px'
                                    }}
                                >
                                    {props.movie.seasons.map((season, index) => (
                                        <Dropdown.Item
                                            eventKey={season.season_number}
                                            key={index}
                                            className="text-white border-0 py-3 px-4 d-flex align-items-center justify-content-between"
                                            style={{
                                                backgroundColor: 'transparent',
                                                fontSize: '1rem',
                                                transition: 'all 0.2s ease',
                                                borderRadius: '6px',
                                                margin: '2px 8px'
                                            }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <span className="fw-semibold">Season {season.season_number}</span>
                                            </div>
                                            {season.episode_count && (
                                                <span
                                                    className="badge rounded-pill"
                                                    style={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                        fontSize: '0.75rem'
                                                    }}
                                                >
                                            {season.episode_count}
                                        </span>
                                            )}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div
                                className="episodes-horizontal-scroll px-3"
                                style={{
                                    overflowX: 'auto',
                                    overflowY: 'hidden',
                                    paddingBottom: '10px'
                                }}
                            >
                                <div
                                    className="d-flex gap-4"
                                    style={{
                                        width: 'max-content',
                                        paddingBottom: '20px'
                                    }}
                                >
                                    {currentSeason.episodes.map((episode, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                minWidth: '400px',
                                                maxWidth: '280px'
                                            }}
                                        >
                                            <EpisodeCard
                                                onPlay={() => onChange(episode.episode_number)}
                                                season={currentSeason.season_number}
                                                episode={episode}
                                                className="h-100 netflix-episode-card"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default ChangeSeasonEpisode;