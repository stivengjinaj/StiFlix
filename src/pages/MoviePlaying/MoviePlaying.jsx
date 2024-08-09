import {useParams} from "react-router-dom";


function MoviePlaying() {

    const {movieId} = useParams();

    return (
        <div>
            <h1>Movie Playing: {movieId}</h1>
        </div>
    );
}

export default MoviePlaying;