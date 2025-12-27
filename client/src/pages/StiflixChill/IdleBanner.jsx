import PropTypes from "prop-types";
import "./IdleBanner.css";

const IdleBanner = ({ message, onClose }) => {
    return (
        <div className="idle-banner">
            <div className="idle-banner-content">
                <p className="idle-banner-text">{message}</p>
                <button className="idle-banner-btn" onClick={onClose}>
                    Whatever
                </button>
            </div>
        </div>
    );
};

IdleBanner.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default IdleBanner;