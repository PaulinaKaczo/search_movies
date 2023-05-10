import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import {Button, FormControl, InputLabel, MenuItem, NativeSelect, Select} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ChangePages from "./ChangePages.jsx";
import { Link } from "react-router-dom";
import FavouritesList from "./FavouritesList.jsx";
import MoviesOrTVsList from "./MoviesOrTVsList.jsx";

function SearchMovies() {
  const categoriesList = ["movie", "tv"];
  const [selectedCategories, setSelectedCategories] = useState("");

  const [genresMovie, setGenresMovie] = useState([]);
  const [genresTV, setGenresTV] = useState([]);

  const [selectedGenreMovie, setSelectedGenreMovie] = useState("");
  const [selectedGenreTV, setSelectedGenreTV] = useState("");

  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);

  const [page, setPage] = useState(1);

  const [favouritesMovie, setFavouritesMovie] = useState([]);
  const [favouritesTV, setFavouritesTV] = useState([]);

    const [selectedIds, setSelectedIds] = useState([]);

  //Lista gatunków filmów
  useEffect(() => {
    async function fetchGenreMovies() {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=c6ad547b3b1a0402c59a8ca2800e8e97"
      );
      const data = await response.json();
      setGenresMovie(data.genres);
    }

    fetchGenreMovies();
  }, []);

  //Lista gatunków TV series
  useEffect(() => {
    async function fetchGenreTV() {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/tv/list?api_key=c6ad547b3b1a0402c59a8ca2800e8e97"
      );
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





  const handleAddToFavourites = (favouriteList, item, setter) => {
    if (!favouriteList.includes(item)) {
        setter((prevFavourites) => [...prevFavourites, item]);
        setSelectedIds((prevIds) => [...prevIds, item.id]);
    }
  };

  //sprawdza, czy dany element jest zaznaczony jako ulubiony
    const isLiked = (id) => selectedIds.includes(id);

//funkcja handleSelect zmienia stan zaznaczenia elementu na przeciwny po kliknięciu przycisku.
    const handleSelect = (id) => {
        if (isLiked(id)) {
            setSelectedIds((prevIds) => prevIds.filter((f) => f !== id));
        } else {
            setSelectedIds((prevIds) => [...prevIds, id]);
        }
    };

  return (
    <div className="container">
      <FavouritesList
        favouritesMovie={favouritesMovie}
        favouritesTV={favouritesTV}
      />
        <div className='search_box'>
      <Header />
      <div className="search_box--form">
          <form
          className="form_search"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
            // id="category"
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}
              label="Category"
          >
            <option value="">---</option>

            {categoriesList.map((category) => (
              <MenuItem value={category} key={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
                  </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
            Genre
          </InputLabel>
          <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
            value={
              selectedCategories === "movie"
                ? selectedGenreMovie
                : selectedGenreTV
            }
            onChange={
              selectedCategories === "movie"
                ? (e) => setSelectedGenreMovie(e.target.value)
                : (e) => setSelectedGenreTV(e.target.value)
            }
              label="Choose genre"
            disabled={!genresMovie.length || !genresTV.length}
          >
            <option value="">---</option>

            {selectedCategories === "movie"
              ? genresMovie.map((genreMovie) => (
                  <MenuItem value={genreMovie.id} key={genreMovie.id}>
                    {genreMovie.name}
                  </MenuItem>
                ))
              : genresTV.map((genreTV) => (
                  <MenuItem value={genreTV.id} key={genreTV.id}>
                    {genreTV.name}
                  </MenuItem>
                ))}
          </Select>

          <Button
            variant="outlined"
            size="small"
            onClick={
              selectedCategories === "movie"
                ? handleSearchMovie
                : handleSearchTV
            }
          >
            SEARCH
          </Button>
              </FormControl>
          </form>
      </div>
      </div>

      <MoviesOrTVsList
        selectedCategories={selectedCategories}
        movies={movies}
        tvs={tvs}
        handleAddToFavourites={handleAddToFavourites}
        favouritesMovie={favouritesMovie}
        setFavouritesMovie={setFavouritesMovie}
        favouritesTV={favouritesTV}
        setFavouritesTV={setFavouritesTV}
        isLiked={isLiked}
      />
      <ChangePages page={page} setPage={setPage} movies={movies} tvs={tvs} />
    </div>
  );
}

export default SearchMovies;
