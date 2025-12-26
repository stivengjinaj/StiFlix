import { Accordion, Container } from "react-bootstrap";

function Faq() {
    return (
        <Container fluid className="mt-2 mb-5 text-white p-0">
            <Accordion defaultActiveKey={null} alwaysOpen={false}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        What is Stiflix?
                    </Accordion.Header>
                    <Accordion.Body>
                        Stiflix is a free streaming platform where you can watch
                        movies and TV shows.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        How much does Stiflix cost?
                    </Accordion.Header>
                    <Accordion.Body>
                        It is free. Fuck Netflix, we are fed up with those bullshit prices.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        Where can I watch?
                    </Accordion.Header>
                    <Accordion.Body>
                        You can watch Stiflix everywhere (theoretically). On smart TVs it
                        might be slow.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        What can I watch on Stiflix?
                    </Accordion.Header>
                    <Accordion.Body>
                        Basically every movie or TV show available on the internet.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}

export default Faq;
