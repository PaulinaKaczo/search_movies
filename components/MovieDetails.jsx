import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";


function MovieDetails() {
    const {movieId} = useParams();

    const [movie, setMovie] = useState('');



    async function getMovieDetails(id) {
        const response = await fetch (`https://api.themoviedb.org/3/movie/${id}?api_key=c6ad547b3b1a0402c59a8ca2800e8e97&language=en-US`)
        return response.json();
    }


    useEffect(() => {
                getMovieDetails(movieId).then((data) => setMovie(data))
            }, [movieId]);



    return (

            <div className="movie_details">
                <div className="image-container">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                </div>
                <div>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>{`Average: ${movie.vote_average} (${movie.vote_count} votes)`}</p>
                </div>

            <button>Add to fovourite</button>
            </div>
    );

}

export default MovieDetails;