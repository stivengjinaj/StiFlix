import {useNavigate} from "react-router-dom";

{/* eslint-disable react/prop-types */}
import {useGSAP} from "@gsap/react";
import {useEffect, useRef, useState} from "react";
import {Container, Row} from "react-bootstrap";
import {gsap} from "gsap";
import {formatString} from "../../helper/miscs.js";

const MoviesCarousel = (props) => {
    const rowRef = useRef();
    const navigate = useNavigate();
    const [columnsToShow, setColumnsToShow] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);
    const [carouselScope] = useState(props.title === "Popular on Stiflix" ? "popular" : (props.title === "Trending Now" ? "trending" : (props.title === "Top Rated Movies" ? "topMovies" : "topShows")));
    const isSmartTV = /SmartTV|HbbTV|VIDAA|Web0S|Tizen|X11; Linux armv7l/.test(navigator.userAgent);
    const [showArrows, setShowArrows] = useState(false);

    useEffect(() => {
        const viewportWidth = window.innerWidth;
        const columnsPerView = Math.floor(viewportWidth / 100);
        setScreenWidth(viewportWidth);
        setColumnsToShow(columnsPerView);
    }, [props.movies]);

    useGSAP(() => {
        if(!isSmartTV) {
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
        }
    }, [screenWidth]);


    useGSAP(() => {
        if(!isSmartTV) {
            gsap.from(`#movie-carousel-${carouselScope}`, {
                y: 100,
                opacity: 0,
                delay: 1.0,
            });
        }
    });

    const scrollLeft = () => {
        const scrollContainer = document.getElementsByClassName(formatString(carouselScope))[0];
        scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        const scrollContainer = document.getElementsByClassName(formatString(carouselScope))[0];
        scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        props.movies.length > 0 && (
            <Container fluid className="p-0 w-100 mb-3 mt-3" id={"movie-carousel-" + carouselScope}>
                <Row className="justify-content-start align-items-center px-3 mt-3">
                    <h3 style={{ fontFamily: 'Netflix Sans1' }} className="text-white mt-3">
                        {props.title}
                    </h3>
                </Row>

                <Container
                    fluid
                    id={!isSmartTV ? (props.scrollable ? `scrollable` : `carousel-slider`) : `scrollable`}
                    className={`w-100 mt-3 ${formatString(carouselScope)}`}
                >
                    <table>
                        <tbody>
                        <tr id={`movie-carousel-row-${carouselScope}`} ref={rowRef}>
                            {props.movies.slice(0, columnsToShow).map((item, index) => (
                                <td
                                    key={index}
                                    className={`carousel-slider-cover mx-2`}
                                    onClick={() =>
                                        navigate(`/movies/info/${item.isSeries ? "tv" : "movie"}/${item.id}`)
                                    }
                                >
                                    <img
                                        alt=""
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                    />
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </Container>
                {
                    isSmartTV
                        ? (
                            <>
                                <div
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'black',
                                    }}
                                    className="scroll-arrow-left"
                                    onClick={scrollLeft}>
                                    &#10094;
                                </div>
                                <div
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'black',
                                    }}
                                    className="scroll-arrow-right"
                                    onClick={scrollRight}>
                                    &#10095;
                                </div>
                            </>
                        )

                        : (
                            !props.moving && (
                                <>
                                    <div
                                        onMouseEnter={() => setShowArrows(true)}
                                        onMouseLeave={() => setShowArrows(false)}
                                        style={showArrows ? {
                                            color: 'white',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        } : {
                                            color: 'transparent',
                                            backgroundColor: 'transparent',
                                        }}
                                        className="scroll-arrow-left"
                                        onClick={scrollLeft}>
                                        &#10094;
                                    </div>
                                    <div
                                        onMouseEnter={() => setShowArrows(true)}
                                        onMouseLeave={() => setShowArrows(false)}
                                        style={showArrows ? {
                                            color: 'white',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        } : {
                                            color: 'transparent',
                                            backgroundColor: 'transparent',
                                        }}
                                        className="scroll-arrow-right"
                                        onClick={scrollRight}>
                                        &#10095;
                                    </div>
                                </>
                            )
                        )

                }

            </Container>
        )
    );
};

export default MoviesCarousel;
