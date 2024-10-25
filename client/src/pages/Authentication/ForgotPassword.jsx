/*eslint-disable react/prop-types*/
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import logo from "../../assets/images/logo.png";
import {useNavigate} from "react-router-dom";

function ForgotPassword(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [resetStatus, setResetStatus] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        sendPasswordResetEmail(props.authentication, email)
            .then(() => {
                setResetStatus("Password reset email sent successfully");
            })
            .catch((error) => {
                setResetStatus(error.message);
            });
    }

    return (
        <Container fluid className="login-bg bg-g">

            <Row className="bg-gradient-dark py-4 mb-3">
                <Col xs={6} sm={6} md={6} className="d-flex justify-content-center align-items-center">
                    <img src={logo} alt="Logo" width={150} height={50} />
                </Col>
            </Row>

            <Row id="login-form" className="justify-content-center align-items-center">
                        <Col xs={12} sm={8} md={6} lg={5} xxl={3}
                             className="flex-column justify-content-center align-items-center px-5 login-col custom-xl"
                             style={{backgroundColor: "rgba(0,0,0,0.6)"}}
                        >
                            {resetStatus === ""
                                ? (
                                    <>
                                        <h5 className="text-white my-5 mx-4">Please enter your email address.</h5>
                                        <Form>
                                            <Form.Group className="mb-3 mx-4">
                                                <Form.Floating className="mb-3">
                                                    <Form.Control
                                                        id="email"
                                                        type="email"
                                                        placeholder="Email address"
                                                        required
                                                        className="custom-input"
                                                        onChange={(event) => {
                                                            setEmail(event.target.value)
                                                        }}
                                                    />
                                                    <label htmlFor="email" className="custom-label">Email
                                                        address</label>
                                                </Form.Floating>
                                            </Form.Group>
                                            <Form.Group className="mx-4">
                                                <Button
                                                    variant="danger"
                                                    type="submit"
                                                    onClick={handleResetPassword}
                                                >
                                                    Reset Password
                                                </Button>
                                                <Button
                                                    className="mx-2"
                                                    variant="danger"
                                                    type="submit"
                                                    onClick={props.handleForgotPassword}
                                                >
                                                    Login
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                    </>
                                )
                                : (
                                    <Container className="d-flex flex-column justify-content-center">
                                        <h5 className="text-white my-5 mx-4">{resetStatus}</h5>
                                        <Button
                                            variant="danger"
                                            type="submit"
                                            onClick={props.handleForgotPassword}
                                        >
                                            Login
                                        </Button>
                                    </Container>

                                )
                            }
                        </Col>
                )
            </Row>
        </Container>
    );
}

export default ForgotPassword;