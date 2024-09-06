{/*eslint-disable react/prop-types*/}
import logo from "../../assets/images/titleLogo.png";
import {Container, Dropdown, Form, Nav, Navbar} from "react-bootstrap";
import {useState} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {auth, db} from "../../../firebaseConfiguration.js";
import {useNavigate} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";

function NavBarMobile(props) {
    const navigate = useNavigate()
    const [searchVisible, setSearchVisible] = useState(false);
    const [user, setUser] = useState(auth.currentUser);
    const [avatar, setAvatar] = useState(null)

    auth.onAuthStateChanged((usr) => {
        if (usr) {
            setUser(usr);
            getDoc(doc(db, "users", usr.uid)).then((doc) => {
                setAvatar(doc.data().avatar);
            });
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

              <Form
                  onSubmit={(e) => {
                      e.preventDefault()
                  }}
                  onChange={(e) => {
                      if (searchVisible) {
                          props.handleSearch(e.target.value);
                      }
                  }}
                  className="d-flex align-items-center me-3"
              >
                  {searchVisible && (
                      <Form.Control
                          type="search"
                          className="search-input"
                          aria-label="Search"
                      />
                  )}
                  <i onClick={() => {
                      props.startSearching()
                      setSearchVisible(!searchVisible)
                  }} className="bi bi-search text-white h2"></i>
                  {
                      user && (
                          <Dropdown align={{lg: 'start'}} className="mx-3">
                              <Dropdown.Toggle className="p-0 btn-avatar">
                                  {avatar && <img src={`/avatars/${avatar}.png`} alt="avatar"
                                        width={50} height={50} className="rounded-3"/>}
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="mt-2 bg-dark">
                                  <Dropdown.Item className="text-white" href="/movies">Home</Dropdown.Item>
                                  <Dropdown.Item className="text-white" href="/account">Account</Dropdown.Item>
                                  <Dropdown.Item className="text-white" href="/favourites">Favourites</Dropdown.Item>
                                  <Dropdown.Item className="text-white" href="/watched-list">Watchlist</Dropdown.Item>
                                  <Dropdown.Item className="text-white" href="/to-watch-list">Watch Later</Dropdown.Item>
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