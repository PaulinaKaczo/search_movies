import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddOpinion from "./AddOpinion.jsx";

function MovieDetails() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState("");

  async function getMovieDetails(id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=c6ad547b3b1a0402c59a8ca2800e8e97&language=en-US`
    );
    return response.json();
  }

  useEffect(() => {
    getMovieDetails(movieId).then((data) => setMovie(data));
  }, [movieId]);

  return (
    <div className="details">
      <div className="image-container">
        <img
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className='description'>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p className='average_note'><strong>Average: </strong>{movie.vote_average} <FontAwesomeIcon className="star_icon" icon={faStar} /> </p>
        <p className='votes'>{`(${movie.vote_count} votes)`}</p>
        <AddOpinion/>
      </div>

    </div>
  );
}

export default MovieDetails;
