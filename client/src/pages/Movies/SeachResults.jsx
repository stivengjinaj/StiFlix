{/*eslint-disable react/prop-types */}
import FetchLinksController from "../../controllers/FetchLinksController.js";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {getYearFromDate, stringQuery} from "../../helper/miscs.js";
import {Card, Col, Container, Row} from "react-bootstrap";

function SeachResults(props) {

    const linkFetcher = new FetchLinksController();

    useGSAP(() => {
        gsap.from('.allMovies', {
            y: 100,
            opacity: 0,
        })
    }, []);

    const getMovieLinks = async (movie) => {
        const links = await linkFetcher.fetchLinks(stringQuery(movie.title), "movie", getYearFromDate(movie.release_date), movie.id);
        console.log(links);
        return links;
    }


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
                                    onClick={() => getMovieLinks(movie)}
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