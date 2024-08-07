import './App.css'
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import InitialPage from "./pages/InitialPage/InitialPage.jsx";
import Movies from "./pages/Movies/Movies.jsx";

function App() {
    return (
        <Routes>
            <Route index element={<InitialPage />} />
            <Route path={'/movies'} element={<Movies />} />
        </Routes>
    );
}

export default App
