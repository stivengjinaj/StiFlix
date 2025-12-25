import { Container, Row, Col, Card } from "react-bootstrap";

const DmcaDisclaimer = () => {
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            <h1 className="mb-4 text-center">DMCA Disclaimer</h1>

                            <p>
                                This website does not host any video files on its own servers.
                                All content available on this site is provided by third-party
                                sources freely available on the internet.
                            </p>

                            <p>
                                We do not claim ownership of any movies, TV shows, or media
                                content displayed or linked on this website. All trademarks,
                                copyrights, and media rights belong to their respective owners.
                            </p>

                            <h5 className="mt-4">Copyright Infringement</h5>
                            <p>
                                If you are a copyright owner or an authorized representative and
                                believe that any content linked on this site infringes your
                                copyright, you may request its removal.
                            </p>

                            <p>
                                Upon receiving a valid DMCA takedown request, we will promptly
                                review and remove the reported links where appropriate.
                            </p>

                            <h5 className="mt-4">Takedown Requests</h5>
                            <p>
                                Please send your takedown request with sufficient proof of
                                ownership to the following email address:
                            </p>

                            <p className="fw-semibold">
                                Email:{" "}
                                <a href="mailto:soft75blog@gmail.com">
                                    soft75blog@gmail.com
                                </a>
                            </p>

                            <p className="text-muted mt-4">
                                We encourage copyright owners to contact us directly before
                                taking any legal action. We respect intellectual property rights
                                and aim to comply with applicable copyright laws.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DmcaDisclaimer;
