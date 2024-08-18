import {Container, Spinner} from "react-bootstrap";

function Loading() {
    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-dark">
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