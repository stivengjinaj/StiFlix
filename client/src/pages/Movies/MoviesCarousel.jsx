import {useNavigate} from "react-router-dom";

{/* eslint-disable react/prop-types */}
import {useGSAP} from "@gsap/react";
import {useEffect, useRef, useState} from "react";
import {Container, Row} from "react-bootstrap";
import {gsap} from "gsap";

const MoviesCarousel = (props) => {
    const rowRef = useRef();
    const navigate = useNavigate();
    const [columnsToShow, setColumnsToShow] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);
    const [carouselScope] = useState(props.title === "Popular on Stiflix" ? "popular" : (props.title === "Trending Now" ? "trending" : (props.title === "Top Rated Movies" ? "topMovies" : "topShows")));

    useEffect(() => {
        const viewportWidth = window.innerWidth;
        const columnsPerView = Math.floor(viewportWidth / 100);
        setScreenWidth(viewportWidth);
        setColumnsToShow(columnsPerView);
    }, [props.movies]);

    useGSAP(() => {
        if (props.moving && rowRef.current) {
            props.scrollable && rowRef.current.classList.add("scrollable");
            gsap.fromTo(
                `#movie-carousel-row-${carouselScope}`,
                { x: 0 },
                {
                    ease: "none",
                    x: screenWidth - rowRef.current.scrollWidth,
                    delay: 2,
                    duration: 15,
                    repeat: -1,
                    yoyo: true,
                }
            );
        }
    }, [screenWidth]);


    useGSAP(() => {
        gsap.from(`#movie-carousel-${carouselScope}`, {
            y: 100,
            opacity: 0,
            delay: 1.0,
        });
    });

    return (
        props.movies.length > 0 && (
            <Container fluid className="w-100 mb-3 mt-3" id={"movie-carousel-" + carouselScope}>
                <Row className="justify-content-start align-items-center px-3 mt-3">
                    <h3 style={{ fontFamily: 'Netflix Sans1' }} className="text-white mt-3">
                        {props.title}
                    </h3>
                </Row>

                <Container fluid id={props.scrollable ? `scrollable` : `carousel-slider`} className="`w-100 mt-3">
                    <table>
                        <tbody>
                        <tr id={`movie-carousel-row-${carouselScope}`} ref={rowRef}>
                            {props.movies.slice(0, columnsToShow).map((item, index) => (
                                <td key={index} className="carousel-slider-cover" onClick={() => navigate(`/movies/info/${item.id}`)}>
                                    <img className="mx-3" alt="" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </Container>
            </Container>
        )
    );
};

export default MoviesCarousel;
