import './App.css'
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import InitialPage from "./pages/InitialPage/InitialPage.jsx";
import Movies from "./pages/Movies/Movies.jsx";
import MoviePlaying from "./pages/MoviePlaying/MoviePlaying.jsx";
import Login from "./pages/Authentication/Login.jsx";
import Register from "./pages/Authentication/Register.jsx";

function App() {
    return (
        <Routes>
            <Route index element={<InitialPage />} />
            <Route path={'/movies'} element={<Movies />} />
            <Route path={'/movies/:movieId'} element={<MoviePlaying />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
        </Routes>
    );
}

export default App
