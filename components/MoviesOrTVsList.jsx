import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function MoviesOrTVsList({
  selectedCategories,
  movies,
  tvs,
  handleAddToFavourites,
  favouritesMovie,
  setFavouritesMovie,
  favouritesTV,
  setFavouritesTV,
}) {
  const list = selectedCategories === "movie" ? movies : tvs;

  return (
    <div className="selected_box">
      {list.length > 0 && (
        <>
          <h2>{selectedCategories === "movie" ? "Movies" : "TV Series"}</h2>
          <Grid container spacing={{ md: 3 }} columns={{ md: 16 }}>
            {list.map((item) => (
              <Grid md={4} key={item.id}>
                <Link to={`/${selectedCategories}/${item.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                </Link>
                <h3>{item.title || item.name}</h3>
                <button
                  className="favourite_btn"
                  onClick={
                    selectedCategories === "movie"
                      ? () =>
                          handleAddToFavourites(
                            favouritesMovie,
                            item,
                            setFavouritesMovie
                          )
                      : () =>
                          handleAddToFavourites(
                            favouritesTV,
                            item,
                            setFavouritesTV
                          )
                  }
                >
                  {favouritesMovie.includes(item) ||
                  favouritesTV.includes(item) ? (
                    <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
                  ) : (
                    <FontAwesomeIcon icon={faHeart} style={{ color: "gray" }} />
                  )}
                </button>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default MoviesOrTVsList;
