import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function FavouritesList({
  showFavouriteList,
  favouritesMovie,
  favouritesTV,
  setFavouritesMovie,
  setFavouritesTV,
}) {
  //usuwa filmy/tv z listy ulubionych za pomocą kosza
  const handleDeleteFromFavourites = (favouriteList, item, setter) => {
    setter((prevFavourites) => prevFavourites.filter((f) => f.id !== item.id));
    setSelectedIds((prevIds) => prevIds.filter((f) => f !== item));
  };

  return (
    showFavouriteList && (
      <div className="favourites_box">
        <p>Favourite Movies: </p>
        <ul>
          {favouritesMovie.map((item) => (
            <li key={item.id}>
              {" "}
              {item.title}
              {
                <button
                  className="delete_btn"
                  onClick={() =>
                    handleDeleteFromFavourites(
                      favouritesMovie,
                      item,
                      setFavouritesMovie
                    )
                  }
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              }
            </li>
          ))}
        </ul>

        <p>Favourite TV Series: </p>
        <ul>
          {favouritesTV.map((item) => (
            <li key={item.id}>
              {" "}
              {item.name}
              {
                <button
                  className="delete_btn"
                  onClick={() =>
                    handleDeleteFromFavourites(
                      favouritesTV,
                      item,
                      setFavouritesTV
                    )
                  }
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              }
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default FavouritesList;
