import PropTypes from "prop-types";
import {useState} from "react";

function EditUserRole({ editingUser, setEditingUser, setEditingUserRole, setUserRole }) {
    const [role, setRole] = useState("VIEWER");
    return (
        <div className="modal-backdrop" onClick={() => setEditingUser(null)}>
            <div className="modal-content-custom" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5>Edit {editingUser.fullName} Role</h5>
                    <button className="btn-close" onClick={() => {
                        setEditingUserRole(false)
                        setEditingUser(null)
                    }}></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            defaultValue={"VIEWER"}
                            className="form-select"
                            onChange={e => setRole(e.target.value)}
                        >
                            <option value="OWNER">OWNER</option>
                            <option value="EDITOR">EDITOR</option>
                            <option value="VIEWER">VIEWER</option>
                        </select>
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary flex-grow-1" onClick={() => {
                            role && setUserRole(editingUser.id, role)
                        }}>
                            Save Changes
                        </button>
                        <button className="btn btn-secondary" onClick={() => {
                            setEditingUserRole(false)
                            setEditingUser(null)
                        }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

EditUserRole.propTypes = {
    editingUser: PropTypes.object.isRequired,
    setEditingUser: PropTypes.func.isRequired,
    setEditingUserRole: PropTypes.func.isRequired,
    setUserRole: PropTypes.func.isRequired,
}

export default EditUserRole;