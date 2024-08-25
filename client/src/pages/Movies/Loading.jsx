import {Container, Spinner} from "react-bootstrap";

function Loading() {
    return (
        <Container fluid className="d-flex bg-gradient-dark-radius justify-content-center align-items-center vh-100">
            <Spinner
                animation="border"
                role="status"
                style={{ color: 'red' }}
            >
            </Spinner>
        </Container>
    );
}

export default Loading;