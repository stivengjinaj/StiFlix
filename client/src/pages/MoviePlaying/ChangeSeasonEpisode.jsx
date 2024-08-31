import EpisodeCard from "./EpisodeCard.jsx";

{/*eslint-disable react/prop-types*/}
import {Container, Dropdown, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


function ChangeSeasonEpisode (props) {
    const navigate = useNavigate();
    const [screen, setScreen] = useState(null);
    const [currentSeason, setCurrentSeason] = useState(props.movie.seasons[0]);

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
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton style={{backgroundColor: "black"}}>
                <Modal.Title className="text-white"><h3>{props.movie.title}</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody p-0 " style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${screen === "desktop" ? props.movie.backdrop_path : props.movie.poster_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
            }}>
                <Container fluid style={{backgroundColor: "rgb(0,0,0,0.7)"}}>
                    <Row className="d-flex justify-content-start p-0">
                        <Dropdown className="tv-season mt-3" style={{ position: 'relative', zIndex: 1050 }} align="start" onSelect={(eventKey) => handleSeasonChange(eventKey)}>
                            <Dropdown.Toggle variant="dark" className="mx-2 py-3 px-5 custom-toggle d-flex align-items-center">
                                <h3 className="mb-0">Season {currentSeason.season_number}</h3>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="bg-dark mx-2">
                                {props.movie.seasons.map((season, index) => (
                                    <Dropdown.Item eventKey={season.season_number} key={index} className="text-white dropdown-item">
                                        <h5>Season {season.season_number}</h5>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                    <Row className="d-flex justify-content-start py-5" style={{overflow: "auto"}}>
                        <div className="d-flex">
                            {currentSeason.episodes.map((episode, index) => (
                                <EpisodeCard key={index} onPlay={() => onChange(episode.episode_number)} season={currentSeason.season_number}
                                             episode={episode}/>
                            ))}
                        </div>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default ChangeSeasonEpisode;