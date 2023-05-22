import "../scss/main.scss";
import SearchMovies from "../components/SearchMovies.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "../components/MovieDetails.jsx";
import TvDetails from "../components/TvDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchMovies />,
  },
  {
    path: "/movie/:movieId",
    element: <MovieDetails />,
  },
  {
    path: "/tv/:tvId",
    element: <TvDetails />,
  },
]);

function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
