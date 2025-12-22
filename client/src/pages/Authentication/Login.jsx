import ForgotPassword from "./ForgotPassword.jsx";

{/*eslint-disable react/prop-types*/}
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    sendEmailVerification
} from 'firebase/auth';
import {auth} from "../../../firebaseConfiguration.js";
import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {getUser, updateUserVerification} from "../../API.js";

function Login(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const [currentUserState, setCurrentUserState ] = useState("")
    const [rememberMe, setRememberMe] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useGSAP(() => {
        if(!props.isSmartTV) {
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
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await setPersistence(
                auth,
                rememberMe ? browserLocalPersistence : browserSessionPersistence
            );

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            if (!user.emailVerified) {
                setLoading(false);
                await auth.signOut();
                setWrongCredentials(false);
                setCurrentUserState("Please verify your email before logging in.");
                return;
            }

            const idToken = await user.getIdToken(true);

            const userData = await getUser(idToken);

            if (userData) {
                if (!userData.verified) {
                    const updateVerification = await updateUserVerification(idToken);
                    if (updateVerification.success) {
                        setLoading(false);
                        setCurrentUserState("");
                        navigate("/movies");
                    }else {
                        setLoading(false);
                        setCurrentUserState("Error verifying user. Please try again later.");
                    }
                }else {
                    setLoading(false);
                    setCurrentUserState("");
                    navigate("/movies");
                }
            }
        } catch (e) {
            setLoading(false);
            setWrongCredentials(true);
        }
    }


    const handleResendEmail = async () => {
        try {
            if (props.user) {
                await sendEmailVerification(props.user);
                setCurrentUserState("Verification email resent. Please check your inbox.");
            } else {
                setCurrentUserState("Error: Unable to resend verification email.");
            }
        } catch (error) {
            console.error("Failed to resend email verification:", error);
            setCurrentUserState("An error occurred while resending the verification email.");
        }
    };

    const handleForgotPassword = () => {
        setForgotPassword(!forgotPassword);
    }

    return (
        <Container fluid className="p-0 bg-gradient-dark-radius min-vh-100">
            {!forgotPassword
                ? <Container fluid className="login-bg bg-g">
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
                                    {currentUserState !== "" && (
                                        <span className="text-danger">{currentUserState}{" "}
                                            {currentUserState.includes("Please verify") && (
                                                <a href="#" onClick={handleResendEmail}>
                                                    Resend email
                                                </a>
                                            )}
                                    </span>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3 mx-4">
                                    <Button
                                        variant="danger"
                                        type="submit"
                                        className="w-100"
                                        onClick={handleLogin}
                                    >
                                        {
                                            loading
                                                ? <Spinner
                                                    animation="border"
                                                    variant="light"
                                                    size="sm"
                                                />
                                                : "Sign In"
                                        }
                                    </Button>
                                </Form.Group>
                            </Form>
                            <Container className="mt-3">
                                <h5 className="text-light text-center">OR</h5>
                                <a href={'#'}><h5 className="text-light text-center mt-3" onClick={() => setForgotPassword(true)}>Forgot password?</h5></a>
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
                : <ForgotPassword user={props.user} authentication={auth} handleForgotPassword={handleForgotPassword}/>
            }
        </Container>
    );
}

export default Login;