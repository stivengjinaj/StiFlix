import {useGSAP} from "@gsap/react";

{/* eslint-disable react/prop-types */}
import {Card, Col, Container, Row} from "react-bootstrap";
import {gsap} from "gsap";
import Loading from "../Miscs/Loading.jsx";
import {useNavigate} from "react-router-dom";

function GridMovies(props) {
    const navigate = useNavigate();

    useGSAP(() => {
        gsap.from('.allMovies', {
            y: 100,
            opacity: 0,
        })
    }, []);

    return (
        props.movies && (
            props.movies.length > 0
                ? (
                    <Container fluid className="py-5 allMovies">
                        <Row>
                            {
                                props.movies && props.movies.map(movie => (
                                    <Col xs={4} sm={4} md={3} lg={2} key={movie.id} className="mb-4">
                                        <Card className="h-100 border-0"
                                              onClick={() => navigate(`/movies/info/${movie.isSeries ? "tv" : "movie"}/${movie.id}`)}
                                              key={`${movie.id}_card`}>
                                            <Card.Img
                                                variant="top"
                                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                                alt={movie.title}
                                            />
                                        </Card>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                )
                : (<Loading/>)
        )
    );
}

export default GridMovies;