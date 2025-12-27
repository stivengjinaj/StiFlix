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
import {getUser, getUserMovies} from "./API.js";
import StiflixChillRoot from "./pages/StiflixChill/StiflixChillRoot.jsx";
import DmcaDisclaimer from "./pages/Miscs/DmcaDisclaimer.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const isSmartTV = detectSmartTV();
    const isRegistering = useRef(false);
    const [userMovies, setUserMovies] = useState(null);

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
                    const tokenResult = await usr.getIdTokenResult()
                    const idToken = tokenResult.token
                    const role = tokenResult.claims.role;
                    const userData = await getUser(idToken);
                    setUser({
                        ...userData,
                        role
                    });
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

    useEffect(() => {
        if (!user) return;
        const fetchUserMovies = async () => {
            const movies = await getUserMovies(user.token);
            if (movies) {
                setUserMovies({
                    ...movies,
                    success: true
                });
            }else {
                setUserMovies({
                    success: false
                })
            }
        }

        fetchUserMovies();
    }, [user])

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
                    userMovies={userMovies}
                    searchQuery={searchQuery}
                    searchResults={searchResults}
                    handleSearchResults={handleSearchResults}
                    handleSignOut={handleSignOut}
                    isSmartTV={isSmartTV}
                />
            } />
            <Route path={'/movies/info/:mediaType/:movieId'} element={<MovieDetails user={user} isSmartTV={isSmartTV} userMovies={userMovies} />} />
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
                user ? <PersonalMovies user={user} type={'favourites'} userMovies={userMovies}/> : <Navigate to={'/login'} />
            } />
            <Route path={'/watchLater'} element={
                user ? <PersonalMovies user={user} type={'watchLater'} userMovies={userMovies}/> : <Navigate to={'/login'} />
            } />
            <Route path={'/watchList'} element={
                user ? <PersonalMovies user={user} type={'watchlist'} userMovies={userMovies}/> : <Navigate to={'/login'} />
            } />
            <Route path={'*'} element={<NotFound />} />
            <Route path={'/stiflixchill'} element={
                user && (user.role === "OWNER" || user.role === "EDITOR")
                    ? <StiflixChillRoot user={user} />
                    : <Navigate to={'/movies'}/>
            } />
            <Route path={"/disclaimer"} element={<DmcaDisclaimer />} />
            <Route path={"/admin"} element={
                user && (user.role === "OWNER")
                    ? <AdminDashboard />
                    : <Navigate to={'/movies'} />
            } />
        </Routes>
    );
}

export default App;
