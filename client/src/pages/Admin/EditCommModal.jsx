import {useState} from "react";
import PropTypes from "prop-types";

const EditCommModal = ({ editingComm, handleUpdateCommunication, setEditingComm }) => {
    const [formData, setFormData] = useState({
        id: editingComm.id,
        type: editingComm.type,
        content: editingComm.content
    });

    return (
        <div className="modal-backdrop" onClick={() => setEditingComm(null)}>
            <div className="modal-content-custom" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5>Edit Communication</h5>
                    <button className="btn-close" onClick={() => setEditingComm(null)}></button>
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
                        <button className="btn btn-primary flex-grow-1" onClick={() => handleUpdateCommunication(editingComm.id, formData)}>
                            Save Changes
                        </button>
                        <button className="btn btn-secondary" onClick={() => setEditingComm(null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

EditCommModal.propTypes = {
    editingComm: PropTypes.object.isRequired,
    handleUpdateCommunication: PropTypes.func.isRequired,
    setEditingComm: PropTypes.func.isRequired,
}

export default EditCommModal;