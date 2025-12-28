import stiflixchill_splash from '../../assets/stiflix&chill_splash.json';
import { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import './Stiflixchill.css';
import {getWindowDimensions} from "../../helper/miscs.js";
import {Button, Container} from "react-bootstrap";
import StiflixChillFlow from "./StiflixChillFlow.jsx";
import * as API from "../../API.js";
import {useNavigate} from "react-router-dom";


const StiflixChillRoot = () => {
    const navigate = useNavigate();
    const [showSplash, setShowSplash] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [movies, setMovies] = useState([]);
    const [communication, setCommunication] = useState([]);
    const [page, setPage] = useState(1);
    const { width, height } = getWindowDimensions();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: stiflixchill_splash,
    };
    useEffect(() => {
        const checkWidth = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkWidth();
        window.addEventListener('resize', checkWidth);

        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setTimeout(() => {
                setShowSplash(false);
            }, 2500);
        }
    }, [isMobile]);

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await API.getStiflixChillHome(page);
            if (!movies) {
                navigate("/movies")
            }
            setMovies(movies);
        }
        const fetchCommunication = async () => {
            const communication = await API.getStiflixChillCommunication();
            if (!communication) return;
            setCommunication(communication);
        }

        fetchMovies();
        fetchCommunication();
    }, [page]);

    if (isMobile) {
        return (
            <Container fluid className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-dark">
                <div className="message-content text-center">
                    <h2 className="text-light">Stiflix&Chill</h2>
                    <p className="text-light">is available only on desktop devices.</p>
                    <p className="text-light">Please visit us on a larger screen.</p>
                </div>
                <Button className="sc_button" onClick={() => navigate("/movies")}>
                    Back to the movies
                </Button>
            </Container>
        );
    }

    if (showSplash) {
        return (
            <Container
                fluid
                className="p-0 w-full h-screen splash-container"
                style={{
                    overflow: 'hidden',
                }}
            >
                <Lottie
                    options={defaultOptions}
                    width={width}
                    height={height}
                />
            </Container>
        );
    }

    return (
        <StiflixChillFlow movies={movies} communication={communication} page={page} setPage={setPage} />
    );
};

export default StiflixChillRoot;

