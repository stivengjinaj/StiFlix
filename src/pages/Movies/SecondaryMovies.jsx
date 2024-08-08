import {useGSAP} from "@gsap/react";

{/* eslint-disable react/prop-types */}
import {useEffect, useRef, useState} from "react";
import {Container, Row} from "react-bootstrap";
import logo1 from "../../assets/test_bg.png";
import logo2 from "../../assets/got.png";
import logo3 from "../../assets/test_bg.png";
import logo4 from "../../assets/got.png";
import logo5 from "../../assets/test_bg.png";
import logo6 from "../../assets/got.png";
import logo7 from "../../assets/test_bg.png";
import {gsap} from "gsap";

function SecondaryMovies() {
    const [images ,setImages] = useState([logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo6]);

    return (
        <PopularMovies images={images}/>
    );
}

const PopularMovies = ({images}) => {
    const rowRef = useRef(null);
    const [columnsToShow, setColumnsToShow] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        const viewportWidth = window.innerWidth;
        const columnsPerView = Math.floor(viewportWidth / 100);
        setScreenWidth(viewportWidth);
        setColumnsToShow(columnsPerView);
    }, [images]);

    useGSAP(() => {
        gsap.from('.popular', {
            y: 100,
            opacity: 0,
            delay: 1.0,
        });

        gsap.fromTo(
            rowRef.current,
            {
                x: 0
            },
            {
                x: (screenWidth - rowRef.current.scrollWidth),
                delay: 0.4,
                duration: 10,
                ease: "none",
                repeat: -1,
                yoyo: true
            }
        );
    }, []);

    return (
        <Container fluid className="w-100 min-vh-100 popular">
            <Row className="justify-content-start align-items-center px-3 mt-3">
                <h3 style={{ fontFamily: 'Netflix Sans1' }} className="text-white mt-3">
                    Popular on Stiflix
                </h3>
            </Row>
            <Container fluid className="bg-transparent min-vh-100 w-100 popular-movies mt-3">
                <table>
                    <tbody>
                    <tr className="popular-movies-row" ref={rowRef}>
                        {images.slice(0, columnsToShow).map((item, index) => (
                            <td key={index}><img className="popular-cover mx-2" alt="" src={item}/></td>
                        ))}
                    </tr>
                    </tbody>
                </table>
            </Container>
        </Container>
    );
};

export default SecondaryMovies;