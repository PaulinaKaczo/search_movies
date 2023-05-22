import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ChangePages from "./ChangePages.jsx";
import { Link } from "react-router-dom";
import FavouritesList from "./FavouritesList.jsx";
import MoviesOrTVsList from "./MoviesOrTVsList.jsx";

function SearchMovies() {
  //lista kategorii
  const categoriesList = ["movie", "tv"];
  //przetrzymywana wybrana kategoria przez użytkownika
  const [selectedCategories, setSelectedCategories] = useState("");

  //listy gatunków dla movies i TV Series
  const [genresMovie, setGenresMovie] = useState([]);
  const [genresTV, setGenresTV] = useState([]);

  //wybrany gatunek przez użytkownika w zależności od kategorii
  const [selectedGenreMovie, setSelectedGenreMovie] = useState("");
  const [selectedGenreTV, setSelectedGenreTV] = useState("");

  //lista filmów lub TV Series w zależności od gatunku
  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);

  //przetrzymuje stronę z filmami lub tv
  const [page, setPage] = useState(1);

  //przetrzymuje movies/tvs wybrane jako ulubione
  const [favouritesMovie, setFavouritesMovie] = useState(JSON.parse(localStorage.getItem("favouritesMovie")) || []);
  const [favouritesTV, setFavouritesTV] = useState(JSON.parse(localStorage.getItem("favouritesTV")) || []);

  //przetrzymuje ID wybranego filmu/serialu
  const [selectedIds, setSelectedIds] = useState([]);

  //pokazuje lub chowa liste w zależności od klikniętego przycisku
  const [showFavouriteList, setShowFavouriteList] = useState(false);

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

  //pobiera filmy w zależności od gatunku i strony któą wskazał użytkownik
  const handleSearchMovie = () => {
    if (selectedGenreMovie) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=c6ad547b3b1a0402c59a8ca2800e8e97&page=${page}&with_genres=${selectedGenreMovie}`
      )
        .then((response) => response.json())
        .then((data) => setMovies(data.results));
      setShowFavouriteList(true);
    }
  };

  //pobiera TV Series w zależności od gatunku i strony któą wskazał użytkownik
  const handleSearchTV = () => {
    if (selectedGenreTV) {
      fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=c6ad547b3b1a0402c59a8ca2800e8e97&page=${page}&with_genres=${selectedGenreTV}`
      )
        .then((response) => response.json())
        .then((data) => setTvs(data.results));
      setShowFavouriteList(true);
    }
  };

  useEffect(() => {
    handleSearchMovie();
  }, [page]);
  useEffect(() => {
    handleSearchTV();
  }, [page]);

  // //dodaje/usuwa filmy/tv z listy ulubionych
  //
  // const handleAddToFavourites = (favouriteList, item, setter) => {
  //   if (!favouriteList.includes(item)) {
  //     setter((prevFavourites) => [...prevFavourites, item]);
  //     setSelectedIds((prevIds) => [...prevIds, item.id]);
  //   } else {setter((prevFavourites) =>
  //       prevFavourites.filter((f) => f.id !== item.id)
  //     );
  //     setSelectedIds((prevIds) => prevIds.filter((f) => f !== item.id));
  //   }
  // };


  // dodaje/usuwa filmy/tv z listy ulubionych
  const handleAddToFavourites = (favouriteList, item, setter) => {
    if (!favouriteList.some((f) => f.id === item.id)) {
      const updatedFavourites = [...favouriteList, item];
      setter(updatedFavourites);
      setSelectedIds((prevIds) => [...prevIds, item.id]);
      localStorage.setItem("favouritesMovie", JSON.stringify(updatedFavourites)) &&
      localStorage.setItem("favouritesTV", JSON.stringify(updatedFavourites));
    } else {
      const updatedFavourites = favouriteList.filter((f) => f.id !== item.id);
      setter(updatedFavourites);
      setSelectedIds((prevIds) => prevIds.filter((id) => id !== item.id));
      localStorage.setItem("favouritesMovie", JSON.stringify(updatedFavourites)) &&
      localStorage.setItem("favouritesTV", JSON.stringify(updatedFavourites));
    }
  };


  return (
    <div className="container">
      <FavouritesList
        showFavouriteList={showFavouriteList}
        favouritesMovie={favouritesMovie}
        favouritesTV={favouritesTV}
        handleAddToFavourites={handleAddToFavourites}
        setFavouritesMovie={setFavouritesMovie}
        setFavouritesTV={setFavouritesTV}
      />
      <div className="search_box">
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
      />
      <ChangePages page={page} setPage={setPage} movies={movies} tvs={tvs} />
    </div>
  );
}

export default SearchMovies;
