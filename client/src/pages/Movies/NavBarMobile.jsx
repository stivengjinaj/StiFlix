import {randomAvatar} from "../../helper/miscs.js";

{/*eslint-disable react/prop-types*/}
import logo from "../../assets/images/titleLogo.png";
import {Container, Dropdown, Form, Nav, Navbar} from "react-bootstrap";
import {useState} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import avatar1 from "../../assets/avatars/avatar1.png";
import avatar2 from "../../assets/avatars/avatar2.png";
import avatar3 from "../../assets/avatars/avatar3.png";
import avatar4 from "../../assets/avatars/avatar4.png";
import {auth} from "../../../firebaseConfiguration.js";
import {useNavigate} from "react-router-dom";

function NavBarMobile(props) {
    const navigate = useNavigate()
    const [searchVisible, setSearchVisible] = useState(false);
    const [user, setUser] = useState(auth.currentUser);

    auth.onAuthStateChanged((usr) => {
        if (usr) {
            setUser(usr);
        }
    })

    const handleSignOut = async (e) => {
        e.preventDefault()
        await auth.signOut().then(() => {
            setUser(null)
            navigate("/");
        });
    }

    useGSAP(() => {
        gsap.fromTo('.search-input', {
            duration: 1,
            x: 100,
            opacity: 0,
            ease: 'ease-in'
        }, {
            x: 0,
            opacity: 1,
            ease: 'ease-out'
        })
    }, [searchVisible]);

    useGSAP(() => {
        gsap.from(['.nav-item-selected', '.nav-item'], {
            duration: 1,
            delay: 0.1,
            x: 100,
            opacity: 0,
            ease: 'ease-in',
            stagger: 0.1
        })
    }, [])

  return (
      <Container fluid className="px-0 position-absolute w-100 bg-gradient-dark z-3">
      <Navbar>
          <Container fluid className="justify-content-between align-items-center">

              <div className="mx-3 mt-2" id="stiflix-logo">
                  <img src={logo} alt="logo" width={25} height={44}/>
              </div>

              <Form inline className="d-flex align-items-center me-3">
                  {searchVisible && (
                      <Form.Control
                          type="search"
                          className="search-input"
                          aria-label="Search"
                      />
                  )}
                  <i onClick={() => setSearchVisible(!searchVisible)} className="bi bi-search text-white h2"></i>
                  {
                      user && (
                          <Dropdown align={{lg: 'start'}} className="mx-3">
                              <Dropdown.Toggle className="p-0 btn-avatar">
                                  <img src={randomAvatar([avatar1, avatar2, avatar3, avatar4])} alt="avatar"
                                       width={50} height={50} className="rounded-3"/>
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="mt-2">
                                  <Dropdown.Item href="/movies">Movies</Dropdown.Item>
                                  <Dropdown.Item href="/account">Account</Dropdown.Item>
                                  <Dropdown.Item onClick={handleSignOut} href="/" className="text-danger">Logout</Dropdown.Item>
                              </Dropdown.Menu>
                          </Dropdown>
                      )
                  }
              </Form>
          </Container>
      </Navbar>
          <Container fluid>
              <Nav className="me-auto justify-content-center">
                  <Nav.Link onClick={() => props.handleSectionChange("home")} className="text-white">
                      <h5 className={props.section === "home" ? "nav-item-selected" : "nav-item"}>Home</h5>
                  </Nav.Link>
                  <Nav.Link onClick={() => props.handleSectionChange("tvShows")} className="text-white">
                      <h5 className={props.section === "tvShows" ? "nav-item-selected" : "nav-item"}>TV Shows</h5>
                  </Nav.Link>
                  <Nav.Link onClick={() => props.handleSectionChange("movies")} className="text-white">
                      <h5 className={props.section === "movies" ? "nav-item-selected" : "nav-item"}>Movies</h5>
                  </Nav.Link>
              </Nav>
          </Container>
      </Container>

  );
}

export default NavBarMobile;