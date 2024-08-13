import {Container, Row, Spinner} from "react-bootstrap";

function Loading() {
    return (
        <Container>
            <Row className="justify-content-center mt-3">
                <Spinner
                    animation="border"
                    role="status"
                    style={{ color: 'red' }}
                >
                </Spinner>
            </Row>
        </Container>
    );
}

export default Loading;