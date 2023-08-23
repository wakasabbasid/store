import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Basket from "./Containers/Basket";
import Home from "./Containers/Home";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "/cart",
        element: <Basket />,
        errorElement: <ErrorPage />
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
