import './App.css'
import {Route, Routes} from "react-router-dom";
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

function App() {
    return (
        <Routes>
            <Route index element={<InitialPage />} />
            <Route path={'/movies'} element={<Movies />} />
            <Route path={'/movies/info/:movieId'} element={<MovieDetails />} />
            <Route path={'/movies/:movieId'} element={<MoviePlaying />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/account'} element={<MyAccount />} />
            <Route path={'/favourites'} element={<PersonalMovies type={'favourites'} />} />
            <Route path={'/watchLater'} element={<PersonalMovies type={'watchLater'} />} />
            <Route path={'/watchlist'} element={<PersonalMovies type={'watchlist'} />} />
        </Routes>
    );
}

export default App
