import {useEffect, useState} from "react";
import Header from "./Header.jsx";
import SelectedMovies from "./SelectedMovies.jsx";

function SearchMovies() {

    const categoriesList = ['movies', 'TV series'];

    const [category, setCategory] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=c6ad547b3b1a0402c59a8ca2800e8e97')
            .then(response => response.json())
            .then(data => setGenres(data.genres));
        console.log(genres);
    }, []);

    const handleSearch = () => {

        if (selectedGenre) {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=c6ad547b3b1a0402c59a8ca2800e8e97&with_genres=${selectedGenre}`)
                .then(response => response.json())
                .then(data => setMovies(data.results));
        }
    }

    return (
        <div className="box">
            <Header/>
            <div >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">---</option>

                        {categoriesList.map((category) => (
                            <option value={category} key={category}>
                                {category}
                            </option>
                        ))}

                    </select>
                    <label htmlFor="genre">Genre</label>
                    <select
                        name="genre"
                        id="genre"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}

                    >
                        <option value="">---Choose genre---</option>

                        {genres.map((genre) => (
                            <option value={genre.name} key={genre.id}>
                                {genre.name}
                            </option>
                        ))}

                    </select>

                    <button
                        onClick={handleSearch}
                    >Search
                    </button>
                </form>
            </div>
            <div>
                <div>
                    {movies.length > 0 && (
                        <div>
                            <h2>Wyniki wyszukiwania:</h2>
                            <ul>
                                {movies.map(movie => (
                                    <li key={movie.id}>{movie.title}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

    export default SearchMovies;
