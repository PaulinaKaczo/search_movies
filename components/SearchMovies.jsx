import React, {useEffect, useState} from "react";
import Header from "./Header.jsx";
import {Button, InputLabel, NativeSelect} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import ChangePages from "./ChangePages.jsx";
import {Link} from  "react-router-dom";

function SearchMovies() {

    const categoriesList = ['movie', 'tv'];
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [genresMovie, setGenresMovie] = useState([]);
    const [genresTV, setGenresTV] = useState([]);

    const [selectedGenreMovie, setSelectedGenreMovie] = useState('');
    const [selectedGenreTV, setSelectedGenreTV] = useState('');

    const [movies, setMovies] = useState([]);
    const [tvs, setTvs] = useState([]);

    const [page, setPage] = useState(1);



//Lista gatunków filmów
    useEffect(() => {
            async function fetchGenreMovies() {
                const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=c6ad547b3b1a0402c59a8ca2800e8e97');
                const data = await response.json();
                setGenresMovie(data.genres)
            }

            fetchGenreMovies();
        }
, []);

//Lista gatunków TV series
    useEffect(() => {
        async function fetchGenreTV() {
            const response = await fetch('https://api.themoviedb.org/3/genre/tv/list?api_key=c6ad547b3b1a0402c59a8ca2800e8e97');
            const data = await response.json();
            setGenresTV(data.genres);
        }

        fetchGenreTV();
    }, []);




    const handleSearchMovie = () => {

        if (selectedGenreMovie) {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=c6ad547b3b1a0402c59a8ca2800e8e97&page=${page}&with_genres=${selectedGenreMovie}`)
                .then(response => response.json())
                .then(data => setMovies(data.results));
        }
    }

    const handleSearchTV = () => {

        if (selectedGenreTV) {
            fetch(`https://api.themoviedb.org/3/discover/tv?api_key=c6ad547b3b1a0402c59a8ca2800e8e97&page=${page}&with_genres=${selectedGenreTV}`)
                .then(response => response.json())
                .then(data => setTvs(data.results));
        }
    }

    useEffect(() => {
        handleSearchMovie();
    }, [page]);

    useEffect(() => {
        handleSearchTV();
    }, [page]);


    return (
        <div className="box">
            <Header/>
            <div className='form_search_box'>
                <form className='form_search'
                    onSubmit={(e) => {
                        e.preventDefault();

                    }}
                >
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Category
                    </InputLabel>
                    <NativeSelect
                        defaultValue={''}
                        inputProps={{
                            name: 'category',
                            id: 'category',
                        }}
                        // id="category"
                        value={selectedCategories}
                        onChange={(e) => setSelectedCategories(e.target.value)}
                    >
                        <option value="">---</option>

                        {categoriesList.map((category) => (
                            <option value={category} key={category}>
                                {category}
                            </option>
                        ))}

                    </NativeSelect>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Genre
                    </InputLabel>
                    <NativeSelect
                        defaultValue={''}
                        inputProps={{
                            name: 'genre',
                            id: 'genre',
                        }}

                        value={(selectedCategories === 'movie') ? selectedGenreMovie : selectedGenreTV}
                        onChange={(selectedCategories === 'movie') ? ((e) => setSelectedGenreMovie(e.target.value)) : ((e) => setSelectedGenreTV(e.target.value))}
                        disabled={!genresMovie.length || !genresTV.length}
                    >
                        <option value="">{"-Choose genre-"}</option>


                        {(selectedCategories === "movie") ? (genresMovie.map((genreMovie) => (
                        <option value={genreMovie.id} key={genreMovie.id}>
                            {genreMovie.name}
                        </option>
                    )))
                        :
                        (genresTV.map((genreTV) => (
                                        <option value={genreTV.id} key={genreTV.id}>
                                            {genreTV.name}
                                        </option>
                         )))}



                    </NativeSelect>

                    <Button variant="outlined" size="small"
                        onClick={(selectedCategories === "movie") ? (handleSearchMovie) : (handleSearchTV)}
                    >
                        SEARCH
                    </Button>
                </form>
            </div>
            <div className="selected_box">
                {(selectedCategories === 'movie') ? (movies.length > 0 && (
                    <div >
                        <h2>Movies</h2>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {movies.map((movie) => (
                                <Grid xs={2} sm={4} md={4} key={movie.id}>
                                    <Link to={`/movies/${movie.id}`}> <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} /></Link>
                                    <h3>{movie.title}</h3>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                )
                 ) :
                    ( tvs.length > 0 && (
                    <div >
                        <h2>TV Series</h2>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {tvs.map((tv) => (
                                <Grid xs={2} sm={4} md={4} key={tv.id}>
                                    <Link to={`/tv_series/${tv.id}`}> <img src={`https://image.tmdb.org/t/p/w200/${tv.poster_path}`} alt={tv.name} /> </Link>
                                    <h3>{tv.name}</h3>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    ))}
            </div>
            <ChangePages page={page} setPage={setPage} movies={movies} tvs={tvs}/>
        </div>
    )
}

    export default SearchMovies;
