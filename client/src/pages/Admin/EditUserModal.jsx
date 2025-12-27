import PropTypes from "prop-types";
import {useState} from "react";

const EditUserModal = ({ editingUser, handleUpdateUser, setEditingUser }) => {
    const [formData, setFormData] = useState({
        fullName: editingUser.fullName,
        email: editingUser.email,
        avatar: editingUser.avatar,
        verified: editingUser.verified
    });

    const handleSave = () => {
        handleUpdateUser(editingUser.id, formData);
    };

    return (
        <div className="modal-backdrop" onClick={() => setEditingUser(null)}>
            <div className="modal-content-custom" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5>Edit User</h5>
                    <button className="btn-close" onClick={() => setEditingUser(null)}></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.fullName}
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Avatar URL</label>
                        <select
                            className="form-select"
                            value={formData.avatar}
                            onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                        >
                            <option value="avatar1">Avatar 1</option>
                            <option value="avatar2">Avatar 2</option>
                            <option value="avatar3">Avatar 3</option>
                            <option value="avatar4">Avatar 4</option>
                        </select>
                    </div>
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.verified}
                            onChange={e => setFormData({ ...formData, verified: e.target.checked })}
                        />
                        <label className="form-check-label">Verified</label>
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary flex-grow-1" onClick={handleSave}>
                            Save Changes
                        </button>
                        <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

EditUserModal.propTypes = {
    editingUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
        fullName: PropTypes.string,
        email: PropTypes.string,
        avatar: PropTypes.string,
        verified: PropTypes.bool,
        role: PropTypes.string,
    }),
    handleUpdateUser: PropTypes.func.isRequired,
    setEditingUser: PropTypes.func.isRequired,
}

export default EditUserModal;