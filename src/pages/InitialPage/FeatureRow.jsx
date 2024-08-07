{/* eslint-disable react/prop-types */}
import {Col, Row} from "react-bootstrap";

function FeatureRow(props) {
    return (
        <Row className="justify-content-center mx-0 flex-column flex-lg-row mb-4">
            {
                props.textDirection === "left"
                    ? (
                        <>
                            <Col className="d-flex flex-column justify-content-center text-center pt-5 order-1 order-lg-1">
                                <h1 className="text-white">{props.hOne}</h1>
                                <h4 className="text-white">
                                    {props.hFourFirst} <br />
                                    {props.hFourSecond}
                                </h4>
                            </Col>
                            <Col className="d-flex justify-content-start align-items-center order-2 order-lg-2">
                                <div className="tv-container d-flex justify-content-center">
                                    <div>
                                        <video autoPlay playsInline muted loop>
                                            <source src={props.video} type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                            </Col>
                        </>
                    )
                    : (
                        <>
                            <Col className="d-flex justify-content-start align-items-center order-2 order-lg-1">
                                <div className="tv-container d-flex justify-content-center">
                                    <div>
                                        <video autoPlay playsInline muted loop>
                                            <source src={props.video} type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                            </Col>
                            <Col className="d-flex flex-column justify-content-center text-center pt-5 order-1 order-lg-2">
                                <h1 className="text-white">{props.hOne}</h1>
                                <h4 className="text-white">
                                    {props.hFourFirst} <br />
                                    {props.hFourSecond}
                                </h4>
                            </Col>
                        </>
                    )
            }
        </Row>
    );
}

export default FeatureRow;