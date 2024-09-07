import {useNavigate} from "react-router-dom";

{/* eslint-disable react/prop-types */}
import {Container, Row} from "react-bootstrap";

function ContinueWatching (props) {
    const navigate = useNavigate();

    return (
        <Container fluid className="p-0 mt-3">
            <Row className="justify-content-start align-items-center px-3 mt-3">
                <h3 style={{ fontFamily: 'Netflix Sans1' }} className="text-white mt-3">
                    Continue Watching
                </h3>
            </Row>
            <Container fluid className="w-100 mt-3 no-scrollbar overflow-x-scroll">
                <table>
                    <tbody>
                        <tr>
                            {
                                props.movies.map((object, index) => (
                                    <td key={index} className="carousel-slider-cover mx-2" onClick={() =>
                                        navigate(`/${object.movie.isSeries ? "tv" : "movie"}/${object.movie.id}/${object.season}/${object.episode}`)}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${object.movie.poster_path}`}
                                            alt={object.movie.title}
                                            className="carousel-image"
                                        />
                                    </td>
                                ))
                            }
                        </tr>
                    </tbody>
                </table>
            </Container>
        </Container>
    );

}

export default ContinueWatching;