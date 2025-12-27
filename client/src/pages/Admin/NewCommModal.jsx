import {useState} from "react";
import PropTypes from "prop-types";

function NewCommModal({ setNewComm, handleNewComm }) {
    const [formData, setFormData] = useState({
        type: "IDLE_POPUP",
        content: "",
    });
    return (
        <div className="modal-backdrop" onClick={() => setNewComm(null)}>
            <div className="modal-content-custom" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5>New Communication Phrase</h5>
                    <button className="btn-close" onClick={() => setNewComm(null)}></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label className="form-label">Type</label>
                        <select
                            className="form-select"
                            value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option value="IDLE_POPUP">Idle Popup</option>
                            <option value="PLAY_HOVER">Play Hover</option>
                            <option value="TASK">Task</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Content</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary flex-grow-1" onClick={() => handleNewComm(formData)}>
                            Save Changes
                        </button>
                        <button className="btn btn-secondary" onClick={() => setNewComm(null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

NewCommModal.propTypes = {
    setNewComm: PropTypes.func.isRequired,
    handleNewComm: PropTypes.func.isRequired,
}

export default NewCommModal;