import User from "../../models/User.js";

{/*eslint-disable react/prop-types*/}
import {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {auth, db} from "../../../firebaseConfiguration.js";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const [currentState, setCurrentState] = useState("");

    useGSAP(() => {
        gsap.from('img', {
            opacity: 0,
            x: 100,
            duration: 1,
            animation: "ease-in"
        })

        gsap.from('#login-form', {
            opacity: 0,
            y: 100,
            duration: 1,
            animation: "ease-in"
        })
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setWrongCredentials(true);
        } else {
            setWrongCredentials(false);

            const newUser = new User(fullName, email, false);

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                sendEmailVerification(userCredential.user).then(() => {
                    setCurrentState("Registration completed. Please check your email.");
                }).catch((error) => {
                    console.log(error);
                })

                await setDoc(doc(db, "users", userCredential.user.uid), {
                    fullName: newUser.fullName,
                    email: newUser.email,
                    verified: false
                }).then(() => {
                    setFullName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                });
            } catch (error) {
                console.log("Error creating user:", error.message);
            }
        }
    };

    return (
        <Container fluid className="p-0 bg-gradient-dark-radius min-vh-100">
            <Container fluid className="login-bg bg-g">
                <Row className="bg-gradient-dark py-4 mb-3">
                    <Col xs={6} sm={6} md={6} className="d-flex justify-content-center align-items-center">
                        <img src={logo} alt="Logo" width={150} height={50} />
                    </Col>
                </Row>
                <Row id="login-form" className="justify-content-center align-items-center">
                    <Col sm={12} md={6} lg={6} xl={3}
                         className="flex-column justify-content-center align-items-center px-5 login-col"
                         style={{backgroundColor: "rgba(0,0,0,0.6)"}}
                    >
                        <h2 className="text-white my-5 mx-4">Sign up</h2>
                        <Form>
                            <Form.Group className="mb-3 mx-4">
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        id="fullName"
                                        type="text"
                                        placeholder="Full Name"
                                        required
                                        className="custom-input"
                                        onChange={(event) => {
                                            setWrongCredentials(false)
                                            setFullName(event.target.value)
                                        }}
                                    />
                                    <label htmlFor="fullName" className="custom-label">Full Name</label>
                                </Form.Floating>
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4">
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        id="email"
                                        type="email"
                                        placeholder="Email address"
                                        required
                                        className="custom-input"
                                        onChange={(event) => {
                                            setWrongCredentials(false)
                                            setEmail(event.target.value)
                                        }}
                                    />
                                    <label htmlFor="email" className="custom-label">Email address</label>
                                </Form.Floating>
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4">
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        className="custom-input"
                                        onChange={(event) => {
                                            setWrongCredentials(false);
                                            setPassword(event.target.value)
                                        }}
                                    />
                                    <label htmlFor="password" className="custom-label">Password</label>
                                </Form.Floating>
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4">
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        className="custom-input"
                                        onChange={(event) => {
                                            setWrongCredentials(false);
                                            setConfirmPassword(event.target.value)
                                        }}
                                    />
                                    <label htmlFor="confirmPassword" className="custom-label">Confirm Password</label>
                                </Form.Floating>
                                {wrongCredentials && <span className="text-danger">Please check your credentials.</span>}
                                {currentState !== "" && <span className="text-success">{currentState}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4">
                                <Button
                                    variant="danger"
                                    type="submit"
                                    className="w-100"
                                    onClick={handleRegister}
                                >
                                    Register
                                </Button>
                            </Form.Group>
                        </Form>
                        <Container className="mt-5">
                            <h5 className="text-light mt-3 text-center">Already have an account? <a href={'/login'}><strong className="text-white">Login.</strong></a></h5>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Register;