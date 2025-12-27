import PropTypes from "prop-types";

const UserDetailsModal = ({ selectedUser, setSelectedUser }) => {
    const renderCollection = (collectionName, items) => {
        if (!items || items.length === 0) return <p className="text-muted">No items</p>;

        return (
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>Movie ID</th>
                        <th>Type</th>
                        <th>Season</th>
                        <th>Episode</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.movieId}</td>
                            <td>{item.mediaType}</td>
                            <td>{item.season || '-'}</td>
                            <td>{item.episode || '-'}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="modal-backdrop" onClick={() => setSelectedUser(null)}>
            <div className="modal-content-custom" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5>User Details</h5>
                    <button className="btn-close" onClick={() => setSelectedUser(null)}></button>
                </div>
                <div className="modal-body">
                    <div className="mb-4">
                        <h6>Favourites</h6>
                        {renderCollection('favourites', selectedUser.favourites)}
                    </div>
                    <div className="mb-4">
                        <h6>Watch Later</h6>
                        {renderCollection('watchLater', selectedUser.watchLater)}
                    </div>
                    <div>
                        <h6>Watch List</h6>
                        {renderCollection('watchList', selectedUser.watchList)}
                    </div>
                </div>
            </div>
        </div>
    );
};

UserDetailsModal.propTypes = {
    selectedUser: PropTypes.object.isRequired,
    setSelectedUser: PropTypes.func.isRequired,
}

export default UserDetailsModal;