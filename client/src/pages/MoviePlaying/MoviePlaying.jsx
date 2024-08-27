import {useEffect, useRef, useState} from "react";
import FetchLinksController from "../../controllers/FetchLinksController.js";
import {useParams} from "react-router-dom";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";
import {getYearFromDate} from "../../helper/miscs.js";
import Loading from "../Movies/Loading.jsx";

function MoviePlaying() {
    const iframeRef = useRef(null);
    const {mediaType, movieId, season, episode} = useParams();
    const linkFetcher = new FetchLinksController();
    const movieFetcher = new FetchedMovieController();
    const [movie, setMovie] = useState(null);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const fetchLinks = async (fetchedMovie) => {
            if (mediaType === 'movie') {
                try {
                    const response = await linkFetcher.fetchAllLinks(fetchedMovie.title, mediaType, getYearFromDate(fetchedMovie.release_date), movieId);
                    setLinks(response);
                    const response2 = await linkFetcher.fetchSpecialLinks(fetchedMovie.title, mediaType, getYearFromDate(fetchedMovie.release_date), movieId);
                    setLinks([...links, ...response2]);
                }catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                const response = await linkFetcher.fetchTvShowSpecific(fetchedMovie.title, mediaType, getYearFromDate(fetchedMovie.release_date), movieId, season, episode);
                setLinks(response);
            }
        };

        const movieDetails = async () => {
            const fetchedMovie = await movieFetcher.getMediaDetails(movieId, mediaType);
            setMovie(fetchedMovie);
            await fetchLinks(fetchedMovie);
        };

        movieDetails();
    }, [mediaType, movieId]);

    useEffect(() => {
        console.log(links);
    }, [links]);


    return (
        links.length === 0
            ? <Loading />
            : <div className="video-container">
                <iframe
                    ref={iframeRef}
                    className="video"
                    src={links[0]}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
    );
}

export default MoviePlaying;

