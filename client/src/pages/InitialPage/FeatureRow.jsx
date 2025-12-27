import {Row, Col, Card} from "react-bootstrap";
import feature1 from "../../assets/images/feature1.png"
import feature2 from "../../assets/images/feature2.png"
import feature3 from "../../assets/images/feature3.png"
import feature4 from "../../assets/images/feature4.png"

function FeaturesRow() {
    return (
        <Row className="g-4 mt-2">
            <Col sm={6} lg={3}>
                <Card className="h-100 gradient-bg text-white border-0 rounded-4 px-4 pt-3">
                    <Card.Body className="d-flex flex-column justify-content-between">
                        <div>
                            <Card.Title as="h3">
                                Enjoy on your TV
                            </Card.Title>

                            <Card.Text className="mt-3">
                                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
                                Blu-ray players, and more.
                            </Card.Text>
                        </div>

                        <div className="d-flex flex-row justify-content-end mt-5">
                            <img src={feature1} alt="feature1"/>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            <Col sm={6} lg={3}>
                <Card className="h-100 gradient-bg text-white border-0 rounded-4 px-4 pt-3">
                    <Card.Body className="d-flex flex-column align-content-between justify-content-between">
                        <div className="d-flex flex-column justify-content-between">
                            <Card.Title as="h3">
                                {`Watch movies even if you don't have an account`}
                            </Card.Title>

                            <Card.Text className="mt-3">
                                {`You don't need an account to watch movies for free`}
                            </Card.Text>
                        </div>

                        <div className="d-flex flex-row justify-content-end mt-5">
                            <img src={feature2} alt="feature2"/>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            <Col sm={6} lg={3}>
                <Card className="h-100 gradient-bg text-white border-0 rounded-4 px-4 pt-3">
                    <Card.Body>
                        <div className="d-flex flex-column justify-content-between">
                            <Card.Title as="h3">
                                Download your shows to watch offline
                            </Card.Title>

                            <Card.Text className="mt-3">
                                Save your favorites easily and always have something to watch.
                            </Card.Text>
                        </div>

                        <div className="d-flex flex-row justify-content-end mt-5">
                            <img src={feature3} alt="feature3"/>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            <Col sm={6} lg={3}>
                <Card className="h-100 gradient-bg text-white border-0 rounded-4 px-4 pt-3">
                    <Card.Body>
                        <div className="d-flex flex-column justify-content-between">
                            <Card.Title as="h3">
                                Create your own personalized profile <br/>
                            </Card.Title>

                            <Card.Text className="mt-3">
                                Create your profile to save your favourite movies or continue watching a movie where you left it.
                            </Card.Text>
                        </div>

                        <div className="d-flex flex-row justify-content-end mt-5">
                            <img src={feature4} alt="feature4"/>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default FeaturesRow;
