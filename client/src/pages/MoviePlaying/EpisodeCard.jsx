{/*eslint-disable react/prop-types*/}
import {Container} from "react-bootstrap";

function EpisodeCard(props) {
    return (
        <Container className="episode-card me-auto">
            <Container
                className="tv-images"
                style={{overflow: "hidden"}}
                onClick={() => props.onPlay(props.season, props.episode.episode_number)}
            >
                <img
                    src={`https://image.tmdb.org/t/p/w500/${props.episode.still_path}`}
                    alt={props.episode.name}
                    width={450}
                    height={250}
                />
            </Container>
            <h2 className="text-white mt-4">
                {props.episode.episode_number}. {props.episode.name}
            </h2>
            <h5 className="text-white mt-3 border-1 border-top border-secondary">{props.episode.runtime}m</h5>
            <h5 className="text-white mt-3">{props.episode.overview}</h5>
        </Container>
    );
}

export default EpisodeCard;