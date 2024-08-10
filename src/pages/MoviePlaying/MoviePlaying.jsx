import {useParams} from "react-router-dom";
import {useRef, useState} from "react";


function MoviePlaying() {

    const {movieId} = useParams();
    const [showControls, setShowControls] = useState(false);
    const iframeRef = useRef(null);

    const sendPostMessage = (command) => {
        console.log(iframeRef.current.contentWindow);
        iframeRef.current.contentWindow.postMessage(JSON.stringify(command));
    };

    const togglePlayPause = () => {
        sendPostMessage({ event: 'command', func: 'play()' });
    };

    const skipForward = () => {
        sendPostMessage({ event: 'command', func: 'seekTo', args: [10, true] });
    };

    const skipBackward = () => {
        sendPostMessage({ event: 'command', func: 'seekTo', args: [-10, true] });
    };

    return (
        <div
            className="video-container"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <iframe
                ref={iframeRef}
                className="video"
                src="https://rabbitstream.net/v2/embed-4/ez7zI9L4Jg2q?_debug=true"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            {showControls && (
                <div className="custom-controls">
                    <button onClick={skipBackward} className="control-btn">⏪ 10s</button>
                    <button onClick={togglePlayPause} className="control-btn">⏯️</button>
                    <button onClick={skipForward} className="control-btn">10s ⏩</button>
                </div>
            )}
        </div>
    );
}

export default MoviePlaying;

