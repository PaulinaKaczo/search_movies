import './App.css'
import SearchMovies from "../components/SearchMovies.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginOrRegisterForm from "../components/LoginOrRegisterForm.jsx";
import MovieDetails from "../components/MovieDetails.jsx";
import TvDetails from "../components/TvDetails.jsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginOrRegisterForm/>
    },
    {
        path: "/home",
        element: <SearchMovies/>
    },
    {
        path: "/movies/:movieId",
        element: <MovieDetails/>
    },
    {
        path: "/tv_series/:tvId",
        element: <TvDetails/>
    }
    // {
    //     path: "/search2/:cat",
    //     element: <SearchWParams/>
    // },


]);

function App() {

    return (
        <>

            <div className="App">
                <RouterProvider router={router}/>
            </div>
        </>
    )
}

export default App
