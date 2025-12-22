import './App.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import InitialPage from "./pages/InitialPage/InitialPage.jsx";
import Movies from "./pages/Movies/Movies.jsx";
import Login from "./pages/Authentication/Login.jsx";
import Register from "./pages/Authentication/Register.jsx";
import MovieDetails from "./pages/MoviePlaying/MovieDetails.jsx";
import MoviePlaying from "./pages/MoviePlaying/MoviePlaying.jsx";
import MyAccount from "./pages/Account/MyAccount.jsx";
import PersonalMovies from "./pages/Personal/PersonalMovies.jsx";
import {useEffect, useRef, useState} from "react";
import {auth} from "../firebaseConfiguration.js";
import Loading from "./pages/Miscs/Loading.jsx";
import NotFound from "./pages/NotFound.jsx";
import {detectSmartTV} from "./helper/smartTvDetector.js";
import {getUser} from "./API.js";

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const isSmartTV = detectSmartTV();
    const isRegistering = useRef(false);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (usr) => {
            if (isRegistering.current) {
                return;
            }

            if (usr && usr.emailVerified) {
                try {
                    const idToken = await usr.getIdToken(true);
                    const userData = await getUser(idToken);
                    setUser(userData);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async (e) => {
        e.preventDefault();
        await auth.signOut().then(() => {
            setUser(null);
            navigate("/");
        });
    };

    const handleSearchResults = (searchResults, query) => {
        setSearchQuery(query);
        setSearchResults([...searchResults]);
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <Routes>
            <Route index element={<InitialPage user={user} handleSignOut={handleSignOut} isSmartTv={isSmartTV}/>} />
            <Route path={'/movies'} element={
                <Movies
                    user={user}
                    searchQuery={searchQuery}
                    searchResults={searchResults}
                    handleSearchResults={handleSearchResults}
                    isSmartTV={isSmartTV}
                />
            } />
            <Route path={'/movies/info/:mediaType/:movieId'} element={<MovieDetails user={user} isSmartTV={isSmartTV}/>} />
            <Route path={'/:mediaType/:movieId/:season/:episode'} element={<MoviePlaying user={user} screenWidth={screenWidth} />} />
            <Route path={'/login'} element={
                !user ? <Login isSmartTv={isSmartTV}/> : <Navigate to={'/'} />
            } />
            <Route path={'/register'} element={
                !user ? <Register isSmartTv={isSmartTV} isRegisteringRef={isRegistering}/> : <Navigate to={'/'} />
            } />
            <Route path={'/account'} element={
                user ? <MyAccount user={user} handleSignOut={handleSignOut}/> : <Navigate to={'/login'} />
            } />
            <Route path={'/favourites'} element={
                user ? <PersonalMovies user={user} type={'favourites'} /> : <Navigate to={'/login'} />
            } />
            <Route path={'/watchLater'} element={
                user ? <PersonalMovies user={user} type={'watchLater'} /> : <Navigate to={'/login'} />
            } />
            <Route path={'/watchlist'} element={
                user ? <PersonalMovies user={user} type={'watchlist'} /> : <Navigate to={'/login'} />
            } />
            <Route path={'/loading'} element={<Loading />} />
            <Route path={'*'} element={<NotFound />} />
        </Routes>
    );
}

export default App;
