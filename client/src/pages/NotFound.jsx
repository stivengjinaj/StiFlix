import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <Container fluid className="p-0 min-vh-100 bg-gradient-dark-radius d-flex flex-column justify-content-center align-items-center py-5">
            <h1 className="text-danger text-center">
                404
            </h1>
            <h1 className="text-white text-center mt-2">
                {`This page doesn't exist`}
            </h1>
            <Button
                className="sc_button mt-5"
                onClick={() => navigate("/movies")}
            >
                Back to the movies
            </Button>
        </Container>
    );
}

export default NotFound;