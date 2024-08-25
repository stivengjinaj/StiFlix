{/*eslint-disable react/prop-types*/}
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import {auth, db} from "../../../firebaseConfiguration.js";
import { doc, updateDoc } from "firebase/firestore";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const [currentUserState, setCurrentUserState ] = useState("")
    const [rememberMe, setRememberMe] = useState(false);

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

    const handleLogin = async (e) => {
        e.preventDefault()
        setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if(!userCredential.user.emailVerified){
                    setWrongCredentials(false);
                    auth.signOut();
                    setCurrentUserState("Please verify your email before logging in.");
                }else {
                    updateUserVerified(userCredential.user.uid);
                    setCurrentUserState("");
                    navigate("/");
                }
            })
            .catch(() => {
                setWrongCredentials(true);
            });
    }

    const updateUserVerified = async (userId) => {
        try {
            const userDocRef = doc(db, "users", userId);
            await updateDoc(userDocRef, { verified: true });
        } catch (error) {
            navigate("/");
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
                        <h2 className="text-white my-5 mx-4">Sign in</h2>
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
                                {wrongCredentials && <span className="text-danger">Please check your credentials</span>}
                                {currentUserState !== "" && <span className="text-danger">{currentUserState}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4">
                                <Button
                                    variant="danger"
                                    type="submit"
                                    className="w-100"
                                    onClick={handleLogin}
                                >
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
                                onChange={(event) => setRememberMe(event.target.checked)}
                            />
                        </Form.Group>
                        <Container className="mt-3 mx-4">
                            <h5 className="text-light mt-3">New to Stiflix? <a href={'/register'}><strong className="text-white">Sign up
                                now.</strong></a></h5>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Login;