{/*eslint-disable react/prop-types */}
import {useNavigate} from "react-router-dom";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {Card, Col, Container, Row} from "react-bootstrap";

function SeachResults(props) {
    const navigate = useNavigate();
    useGSAP(() => {
        gsap.from('.allMovies', {
            y: 100,
            opacity: 0,
        })
    }, []);


    return (
        <Container fluid className="py-5 allMovies">
            <Row>
                {
                    props.movies.map(movie => (
                        <Col xs={4} sm={4} md={3} lg={2} key={movie.id} className="mb-4">
                            <Card className="h-100 border-0">
                                <Card.Img
                                    variant="top"
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                    onClick={() => navigate(`/movies/info/${movie.isSeries ? "tv" : "movie"}/${movie.id}`)}
                                />
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
}

export default SeachResults;