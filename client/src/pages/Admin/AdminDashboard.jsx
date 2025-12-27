import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';
import EditUserModal from "./EditUserModal.jsx";
import EditCommModal from "./EditCommModal.jsx";
import UserDetailsModal from "./UserDetailsModal.jsx";
import {
    deleteStiflixChillCommunication,
    deleteUser, getAllUsers, getStiflixChillCommunication, saveStiflixChillCommunication,
    updateStiflixChillCommunication, updateUserData, updateUserRole
} from "../../API.js";
import EditUserRole from "./EditUserRole.jsx";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import NewCommModal from "./NewCommModal.jsx";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [communications, setCommunications] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [editingUserRole, setEditingUserRole] = useState(null);
    const [editingComm, setEditingComm] = useState(null);
    const [newComm, setNewComm] = useState(null);

    useEffect(() => {
        fetchUsers();
        fetchCommunications();
    }, []);

    const fetchUsers = async () => {
        const users = await getAllUsers();
        if(!users) return;
        setUsers(users);
    };

    const fetchCommunications = async () => {
        const communications = await getStiflixChillCommunication();
        if(!communications) return;
        setCommunications(communications);
    };

    const handleUpdateUser = async (userId, updates) => {
        const updateUser = await updateUserData({id: userId, ...updates});
        if(!updateUser) return;
        setUsers(users.map(u => u.id === userId ? { ...u, ...updates } : u));
        setEditingUser(null);
    };

    const handleUpdateUserRole = async (userId, role) => {
        const updateUser = await updateUserRole(userId, role)
        if (!updateUser) return;
        setEditingUserRole(false);
        setEditingUser(null);
    }

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const userDeleted = deleteUser(userId)
            if(!userDeleted) return;
            setUsers(users.filter(u => u.id !== userId));
            setSelectedUser(null);
        }
    };

    const handleUpdateCommunication = async (commId, updates) => {
        const communicationSaved = await updateStiflixChillCommunication(updates)
        if(!communicationSaved) return;
        setCommunications(communications.map(c => c.id === commId ? { ...updates } : c));
        setEditingComm(false);
    };

    const handleDeleteCommunication = async (commId) => {
        if (window.confirm('Are you sure you want to delete this communication?')) {
            const communicationDeleted = await deleteStiflixChillCommunication(commId)
            if (!communicationDeleted) return;
            setCommunications(communications.filter(c => c.id !== commId));
        }
    };

    const handleNewCommunication = async (newComm) => {
        const communicationSaved = await saveStiflixChillCommunication(newComm);
        if (!communicationSaved) return;
        window.location.reload();
    }

    const renderUserCard = (user) => (
        <div key={user.id} className="card mb-3">
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <img src={`/avatars/${user.avatar}.png`} alt={user.fullName} className="user-avatar me-3" />
                    <div className="flex-grow-1">
                        <h5 className="mb-1">{user.fullName}</h5>
                        <p className="text-muted mb-0">{user.email}</p>
                    </div>
                    <span className={`badge ${user.verified ? 'bg-success' : 'bg-warning'}`}>
            {user.verified ? 'Verified' : 'Unverified'}
          </span>
                </div>
                <div className="btn-group w-100" role="group">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedUser(user)}>
                        View Details
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditingUser(user)}>
                        Edit
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => {
                        setEditingUserRole(true);
                        setEditingUser(user)
                    }}>
                        Edit Role
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteUser(user.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-3 col-lg-2 sidebar">
                    <div className="sidebar-sticky">
                        <h4 className="sidebar-title">Admin Panel</h4>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('users')}
                                >
                                    Users
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'communications' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('communications')}
                                >
                                    Communications
                                </button>
                            </li>
                            <li className="nav-item mt-3">
                                <button
                                    className={`bg-danger nav-link text-white`}
                                    onClick={() => navigate('/movies')}
                                >
                                    Exit
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="col-md-9 col-lg-10 main-content">
                    <div className="content-header">
                        <h2>{activeTab === 'users' ? 'User Management' : 'Communication Management'}</h2>
                    </div>

                    {activeTab === 'users' && (
                        <div className="row">
                            {users.map(user => (
                                <div key={user.id} className="col-12 col-lg-6 col-xl-4">
                                    {renderUserCard(user)}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'communications' && (
                        <div className="row">
                            <Button className="mb-2" onClick={() => setNewComm(true)}>+ New</Button>
                            {communications.map(comm => (
                                <div key={comm.id} className="col-12 col-lg-6">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h5 className="card-title">{comm.type}</h5>
                                            </div>
                                            <p className="card-text">{comm.content}</p>
                                            <div className="btn-group w-100" role="group">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => setEditingComm(comm)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDeleteCommunication(comm.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {selectedUser && <UserDetailsModal selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}
            {editingUser && !editingUserRole && <EditUserModal editingUser={editingUser} handleUpdateUser={handleUpdateUser} setEditingUser={setEditingUser}/>}
            {editingUserRole && <EditUserRole editingUser={editingUser} setEditingUser={setEditingUser} setEditingUserRole={setEditingUserRole} setUserRole={handleUpdateUserRole}/>}
            {editingComm && <EditCommModal editingComm={editingComm} handleUpdateCommunication={handleUpdateCommunication} setEditingComm={setEditingComm}/>}
            {newComm && <NewCommModal setNewComm={setNewComm} handleNewComm={handleNewCommunication} />}
        </div>
    );
};

export default AdminDashboard;