{/* eslint-disable react/prop-types */}
import {Button, Col, Container, Form, Navbar, Row} from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import smallLogo from "../../assets/images/titleLogo.png";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {db} from "../../../firebaseConfiguration.js";
import {updatePassword} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import User from "../../models/User.js";
import Loading from "../Miscs/Loading.jsx";


function MyAccount(props) {
    const navigate = useNavigate();
    const [screen, setScreen] = useState('desktop');
    const [userDetails, setUserDetails] = useState(null);
    const [changingPassword, setChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [wrongCredentials, setWrongCredentials] = useState(false)

    useEffect(() => {
        const fetchUserDetails = async (usr) => {
            const userDocRef = doc(db, 'users', usr.uid);

            try {
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const userDetails = new User(userData.fullName, usr.email, userData.verified, userData.avatar);
                    setUserDetails(userDetails);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching user document:', error);
            }
        }

        fetchUserDetails(props.user);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setScreen('mobile');
            } else {
                setScreen('desktop');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if(newPassword === confirmPassword) {
            updatePassword(props.user, newPassword).then(() => {
                setChangingPassword(false);
            }).catch(() => {
                console.log('Error changing password');
            });
        }else {
            setWrongCredentials(true);
        }

    }

    return (
        <Container fluid className="min-vh-100 p-0 bg-white">
            <Navbar className="bg-gradient-dark-radius">
                <Container fluid className="justify-content-start align-items-center">
                    <Navbar.Brand>
                        <Button variant="transparent" onClick={() => navigate('/movies')}>
                            <strong>
                                <i className="bi bi-arrow-left text-white h1"></i>
                            </strong>
                        </Button>
                    </Navbar.Brand>
                    <Navbar.Brand href="/movies">
                        {screen === 'desktop' ? (
                            <img src={logo} alt="logo" height={50} width={150} />
                        ) : (
                            <img src={smallLogo} alt="logo" width={25} height={44} />
                        )}
                    </Navbar.Brand>
                </Container>
            </Navbar>
            {
                userDetails
                    ? (
                        <Container fluid className="p-0">
                            <Container className="mt-5">
                                <h2 className="text-dark border-bottom border-secondary pb-3">
                                    My Account
                                </h2>

                                {/* Membership & Billing Section */}
                                <Container className="mt-5 p-0">
                                    <Row className="mb-4 pb-2 border-bottom border-secondary">
                                        <Col xs={12} md={4} className="mb-3">
                                            <h3 className="text-secondary">Membership & Billing</h3>
                                            <Button variant="light" className="px-3 py-2 w-100">
                                                Cancel Membership
                                            </Button>
                                        </Col>
                                        <Col xs={12} md={4} className="mb-3">
                                            <h5 className="text-secondary">Password: ********</h5>
                                            <h5 className="text-secondary">
                                                No billing. Always free. <br />
                                                Fuck Netflix.
                                            </h5>
                                        </Col>
                                        <Col xs={12} md={4} className="mb-3">
                                            {
                                                changingPassword
                                                    ? (
                                                        <Form>
                                                            <Form.Group className="mb-3">
                                                                <Form.Control
                                                                    placeholder="New Password"
                                                                    required
                                                                    onChange={(event) => {
                                                                        setWrongCredentials(false);
                                                                        setNewPassword(event.target.value);
                                                                    }}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3">
                                                                <Form.Control
                                                                    placeholder="Confirm Password"
                                                                    required
                                                                    onChange={(event) => {
                                                                        setWrongCredentials(false);
                                                                        setConfirmPassword(event.target.value);
                                                                    }}
                                                                />
                                                            </Form.Group>
                                                            {wrongCredentials && (
                                                                <Form.Group className="mb-3">
                                                                    <span className="text-danger">Please check your credentials</span>
                                                                </Form.Group>
                                                            )}
                                                            <Button
                                                                variant="danger"
                                                                type="submit"
                                                                onClick={handlePasswordChange}
                                                                className="w-100"
                                                            >
                                                                Change Password
                                                            </Button>
                                                        </Form>
                                                    )
                                                    : (
                                                        <Button
                                                            variant="transparent"
                                                            className="text-primary w-100"
                                                            onClick={() => setChangingPassword(true)}
                                                        >
                                                            Change password
                                                        </Button>
                                                    )
                                            }
                                        </Col>

                                    </Row>

                                    {/* Plan Details Section */}
                                    <Row className="mb-4 pb-2 border-bottom border-secondary">
                                        <Col xs={12} md={4} className="mb-3">
                                            <h3 className="text-secondary">Plan Details</h3>
                                        </Col>
                                        <Col xs={12} md={8} className="mb-3">
                                            <h5>&#8734; screens + HD</h5>
                                        </Col>
                                    </Row>

                                    {/* My Profile Section */}
                                    <Row className="mb-4 pb-2 border-bottom border-secondary">
                                        <Col xs={12} md={4} className="mb-3">
                                            <h3 className="text-secondary">My Profile</h3>
                                        </Col>
                                        <Col xs={12} md={4} className="mb-3">
                                            <Container className="d-flex align-items-center p-0">
                                                <img alt="avatar" src={`/avatars/${userDetails.avatar}.png`} width={50} height={50} />
                                                <h5 className="mx-3">{userDetails.fullName}</h5>
                                            </Container>
                                        </Col>
                                        <Col xs={12} md={4} className="mb-3">
                                            <Button onClick={props.handleSignOut} variant="danger" className="px-3 py-2">
                                                Sign Out
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Container>
                        </Container>
                    )
                    : (
                        <Loading />
                    )
            }
        </Container>
    );
}

export default MyAccount;