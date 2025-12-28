import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        path: "/*",
        element:<App/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
)
