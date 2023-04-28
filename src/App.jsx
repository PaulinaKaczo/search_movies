import './App.css'
import SearchMovies from "../components/SearchMovies.jsx";
import LoginForm from "../components/LoginForm.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";



const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginForm/>
    },
    {
        path: "/search",
        element: <SearchMovies/>
    },
    // {
    //     path: "/selected_movies",
    //     element: <SelectedMovies/>
    // },
    // {
    //     path: "/selected_movies/:movieId",
    //     element: <ChooseMovie/>
    // }
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
