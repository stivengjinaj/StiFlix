import {Container} from "react-bootstrap";

function ErrorPage() {
    return (
        <Container fluid className="p-0 min-vh-100 bg-gradient-dark-radius d-flex flex-column justify-content-center align-items-center py-5">
            <h1 className="text-danger text-center">
                404
            </h1>
            <h1 className="text-white text-center mt-2">
                {`Something went wrong. Please contact the developer: soft75blog@gmail.com`}
            </h1>
        </Container>
    );
}

export default ErrorPage;