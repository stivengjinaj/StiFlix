import {useNavigate} from "react-router-dom";

{/*eslint-disable react/prop-types*/}
import {Button, Container, Dropdown, Form, Nav, Navbar} from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import sc_logo from "../../assets/images/sc.png";
import {useState} from "react";
import gsap from "gsap";

gsap.config().nullTargetWarn = false;

function NavBarDesktop(props) {
    const navigate = useNavigate();
    const [searchVisible, setSearchVisible] = useState(props.searchQuery.length > 0);

    return (
        <Navbar className="position-absolute w-100 bg-gradient-dark z-3">
            <Container fluid className="d-flex flex-row flex-wrap justify-content-sm-end">
                <Navbar.Brand to='/homepage'>
                    <div className="mx-5 mt-2" id="stiflix-logo">
                        <img src={logo} alt="logo" height={50} width={150}/>
                    </div>
                </Navbar.Brand>
                <Nav className="me-auto mt-2">
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
                <Form
                    className="d-flex mx-3"
                    onSubmit={(e) => {
                        e.preventDefault()
                    }}
                    onChange={(e) => {
                        if (searchVisible) {
                            props.handleSearch(e.target.value);
                        }
                    }}
                >
                    {
                        props.user && (props.user.role === "OWNER" || props.user.role === "EDITOR") &&
                        <Button className="sc-button me-3" onClick={() => navigate("/stiflixchill")}>
                            <img
                                alt={"stiflix&chill"}
                                src={sc_logo}
                                width={130}
                                height={25}
                            />
                        </Button>
                    }
                    {searchVisible && (
                        <Form.Control
                            type="search"
                            name="searchInput"
                            className="me-2 search-input"
                            aria-label="Search"
                            defaultValue={props.searchQuery.length > 0 ? props.searchQuery : ""}
                        />
                    )}
                    <i onClick={() => {
                        props.startSearching()
                        setSearchVisible(!searchVisible)
                    }} className="bi bi-search text-white h2"></i>
                </Form>
                {
                    props.user && (
                        <Dropdown align={{lg: 'start', xl: 'end'}} className="mx-4">
                            <Dropdown.Toggle className="p-0 btn-avatar">
                                {props.user && <img src={`/avatars/${props.user.avatar}.png`} alt="avatar"
                                                width={50} height={50} className="rounded-3"/>}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="mt-2 bg-dark dropdown-menu-start dropdown-menu-lg-end">
                                <Dropdown.Item className="text-white" href="/movies">Home</Dropdown.Item>
                                <Dropdown.Item className="text-white" href="/account">Account</Dropdown.Item>
                                <Dropdown.Item className="text-white" href="/favourites">Favourites</Dropdown.Item>
                                <Dropdown.Item className="text-white" href="/watchList">Watchlist</Dropdown.Item>
                                <Dropdown.Item className="text-white" href="/watchLater">Watch Later</Dropdown.Item>
                                {props.user.role === "OWNER" && <Dropdown.Item className="text-white" href="/admin">Admin</Dropdown.Item>}
                                <Dropdown.Item onClick={props.handleSignOut} href="/" className="text-danger">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                }
            </Container>
        </Navbar>
    );
}

export default NavBarDesktop;