import {useGSAP} from "@gsap/react";

{/* eslint-disable react/prop-types */}
import {Card, Col, Container, Row} from "react-bootstrap";
import {gsap} from "gsap";
import Loading from "./Loading.jsx";
import FetchLinksController from "../../controllers/FetchLinksController.js";
import {getYearFromDate, stringQuery} from "../../helper/miscs.js";

function GridMovies(props) {
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
                    props.movies.length > 0
                        ? (props.movies && props.movies.map(movie => (
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
                        )))
                        : (<Loading />)
                }
            </Row>
        </Container>
    );
}

export default GridMovies;