import './App.css'
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import InitialPage from "./pages/InitialPage/InitialPage.jsx";

function App() {
    return (
        <Routes>
            <Route index element={<InitialPage />} />
        </Routes>
    );
}

export default App
