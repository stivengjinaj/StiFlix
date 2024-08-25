import {Container, Row} from "react-bootstrap";

function StiflixFooter() {
    return (
        <footer className="text-white text-center p-3 mt-5">
            <Container>
                <Row>
                    <h6>Stiflix does not store any of the contents present in the site.</h6>
                    <strong>Copyright © Stiflix 2024</strong>
                </Row>
            </Container>
        </footer>
    );
}

export default StiflixFooter;