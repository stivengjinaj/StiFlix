import FetchedMovieController from "../../controllers/FetchedMovieController.js";

{/*eslint-disable react/prop-types*/}
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Loading from "../Miscs/Loading.jsx";

function MoreInfo(props) {
    const fetcher = new FetchedMovieController();
    const [trailer, setTrailer] = useState('');
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchMediaData = async () => {
            try {
                const [trailer, genres] = await Promise.all([
                    fetcher.getTrailer(props.movie.id),
                    fetcher.getMediaGenres(props.movie.id, props.movie.isSeries ? 'tv' : 'movie')
                ]);

                setTrailer(trailer);
                setGenres(genres);
            }catch (e) {
                console.log('Error fetching data:', e);
            }
        }

        fetchMediaData();
    }, [props.movie.id]);

    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton style={{backgroundColor: "black"}}>
                <Modal.Title className="text-white"><h3>{props.movie.title}</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{
                backgroundColor: 'black',
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.movie.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white'
            }}>
                {trailer ? (
                    <iframe
                        src={trailer}
                        width="100%"
                        height="400"
                        allowFullScreen
                        title="Movie Trailer"
                        style={{ marginBottom: '20px' }}
                    ></iframe>
                ): (<Loading />)}
                {genres.length > 0 && (
                    genres.map((genre, index) => (
                        <span key={index} className="badge bg-danger me-2 opacity-75">{genre.name}</span>
                    ))
                )
                }
                <h6 className="text-light mt-3">{props.movie.overview}</h6>
            </Modal.Body>
        </Modal>
    );
}

export default MoreInfo;
