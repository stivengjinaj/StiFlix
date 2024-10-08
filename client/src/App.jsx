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
import {useEffect, useState} from "react";
import {auth} from "../firebaseConfiguration.js";
import Loading from "./pages/Miscs/Loading.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((usr) => {
            setUser(usr);
            setLoading(false);
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
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
            <Route index element={<InitialPage user={user} handleSignOut={handleSignOut}/>} />
            <Route path={'/movies'} element={
                <Movies
                    user={user}
                    searchQuery={searchQuery}
                    searchResults={searchResults}
                    handleSearchResults={handleSearchResults}
                />
            } />
            <Route path={'/movies/info/:mediaType/:movieId'} element={<MovieDetails user={user}/>} />
            <Route path={'/:mediaType/:movieId/:season/:episode'} element={<MoviePlaying user={user}/>} />
            <Route path={'/login'} element={
                !user ? <Login /> : <Navigate to={'/'} />
            } />
            <Route path={'/register'} element={
                !user ? <Register /> : <Navigate to={'/'} />
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
            <Route path={'*'} element={<NotFound />} />
        </Routes>
    );
}

export default App;
