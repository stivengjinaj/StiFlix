import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";

function MoviePlaying() {

    const fetcher = new FetchedMovieController();
    const {movieId} = useParams();
    //const iframeRef = useRef(null);



    return (
        <div>

        </div>
    );
}


/**
 * <div
 *             className="video-container"
 *         >
 *             <iframe
 *                 ref={iframeRef}
 *                 className="video"
 *                 src="https://rabbitstream.net/v2/embed-4/ez7zI9L4Jg2q?_debug=true"
 *                 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
 *             ></iframe>
 *         </div>
 *
 *
 * .video-container {
 *   position: relative;
 *   width: 100vw;
 *   height: 100vh;
 *   overflow: hidden;
 * }
 *
 * .video {
 *   width: 100%;
 *   height: 100%;
 *   border: none;
 * }
 *
 *
 * .control-btn {
 *   background-color: rgba(0, 0, 0, 0.5);
 *   color: white;
 *   border: none;
 *   padding: 10px 20px;
 *   font-size: 18px;
 *   cursor: pointer;
 *   border-radius: 5px;
 *   transition: background-color 0.3s ease;
 * }
 *
 * .control-btn:hover {
 *   background-color: rgba(0, 0, 0, 0.8);
 * }
 *
 * */

export default MoviePlaying;

