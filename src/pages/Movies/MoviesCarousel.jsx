import {useGSAP} from "@gsap/react";

{/* eslint-disable react/prop-types */}
import {useEffect, useRef, useState} from "react";
import {Container, Row} from "react-bootstrap";


import {gsap} from "gsap";
import {rand, sliceStr} from "../../helper/miscs.js";

const MoviesCarousel = (props) => {
    const rowRef = useRef(null);
    const [columnsToShow, setColumnsToShow] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {
        const viewportWidth = window.innerWidth;
        const columnsPerView = Math.floor(viewportWidth / 100);
        setScreenWidth(viewportWidth);
        setColumnsToShow(columnsPerView);
    }, [props.movies]);

        useGSAP(() => {
            if(props.moving) {
                gsap.fromTo(
                    `#movie-carousel-row-${sliceStr(props.title)}`,
                    {
                        x: 0
                    },
                    {
                        x: (screenWidth - rowRef.current.scrollWidth),
                        delay: 2,
                        duration: rand(35, 45),
                        ease: "none",
                        repeat: -1,
                        yoyo: true
                    }
                );
            }
        }, [screenWidth]);


    useGSAP(() => {
        gsap.from(`#movie-carousel-${sliceStr(props.title)}`, {
            y: 100,
            opacity: 0,
            delay: 1.0,
        });
    });

    return (
        <Container fluid className="w-100 mb-3 mt-3" id={"movie-carousel-"+sliceStr(props.title)}>
            <Row className="justify-content-start align-items-center px-3 mt-3">
                <h3 style={{ fontFamily: 'Netflix Sans1' }} className="text-white mt-3">
                    {props.title}
                </h3>
            </Row>
            <Container fluid className="w-100 carousel-slider mt-3" id>
                <table>
                    <tbody>
                    <tr id={`movie-carousel-row-${sliceStr(props.title)}`} ref={rowRef}>
                        {props.movies.slice(0, columnsToShow).map((item, index) => (
                            <td key={index} className="carousel-slider-cover">
                                <img className="mx-3" alt="" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}/>
                            </td>
                        ))}
                    </tr>
                    </tbody>
                </table>
            </Container>
        </Container>
    );
};

export default MoviesCarousel;