import {Container} from "react-bootstrap";

function NotFound() {
    return (
        <Container fluid className="p-0 min-vh-100 bg-gradient-dark-radius align-items-center py-5">
            <h1 className="text-danger text-center mt-5">
                404
            </h1>
            <h1 className="text-white text-center mt-5">
               Hold on bad boy,<br/> this page doesn't exist.
            </h1>
            <h1 className="text-center mt-5">
                &#128536;
            </h1>
        </Container>
    );
}

export default NotFound;