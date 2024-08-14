import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from "../../../firebase.js";
import {Button, Col, Container, FloatingLabel, Form, Navbar, Row} from "react-bootstrap";
import logo from "../../assets/logo.png";

function Login(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/home")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    return (
        <Container fluid className="p-0 bg-gradient-dark-radius min-vh-100">
            <Container fluid className="login-bg bg-g">
                <Row className="bg-gradient-dark py-4 mb-3">
                    <Col xs={6} sm={6} md={6} className="d-flex justify-content-center align-items-center">
                        <img src={logo} alt="Logo" width={150} height={50} />
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center">
                    <Col sm={12} md={6} lg={6} xl={3}
                         className="flex-column justify-content-center align-items-center px-5 login-col"
                         style={{backgroundColor: "rgba(0,0,0,0.6)"}}
                    >
                        <h2 className="text-white my-5 mx-4">Sign in</h2>
                        <Form>
                            <Form.Group controlId="formBasicEmail" className="mb-3 mx-4">
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        id="email"
                                        type="email"
                                        placeholder="Email address"
                                        required
                                        className="custom-input"
                                    />
                                    <label htmlFor="email" className="custom-label">Email address</label>
                                </Form.Floating>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className="mb-3 mx-4">
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        className="custom-input"
                                    />
                                    <label htmlFor="password" className="custom-label">Password</label>
                                </Form.Floating>
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4">
                                <Button variant="danger" type="submit" className="w-100">
                                    Sign In
                                </Button>
                            </Form.Group>
                        </Form>
                        <Container className="mt-3">
                            <h5 className="text-light text-center">OR</h5>
                            <h5 className="text-light text-center mt-3">Forgot password?</h5>
                        </Container>
                        <Form.Group className="mt-5 text-white mx-4 px-2">
                            <Form.Check
                                type={"checkbox"}
                                label={`Remember me`}
                            />
                        </Form.Group>
                        <Container className="mt-3 mx-4">
                            <h5 className="text-light mt-3">New to Stiflix? <strong>Sign un now.</strong></h5>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Login;