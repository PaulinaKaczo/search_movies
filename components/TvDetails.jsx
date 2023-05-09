import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import FavouritesList from "./FavouritesList.jsx";


function TvDetails() {
    const {tvId} = useParams();

    const [tv, setTv] = useState('');


    async function getTVDetails(id) {
        const response = await fetch (`https://api.themoviedb.org/3/tv/${id}?api_key=c6ad547b3b1a0402c59a8ca2800e8e97&language=en-US`)
        return response.json();
    }


    useEffect(() => {
        getTVDetails(tvId).then((data) => setTv(data))
    }, [tvId]);


    return (

        <div className="movie_details">
            <div className="image-container">
            <img src={`https://image.tmdb.org/t/p/w400${tv.poster_path}`} alt={tv.title}/>
        </div>
            <div>
                <h2>{tv.title}</h2>
                <p>{tv.overview}</p>
                <p>{`Average: ${tv.vote_average} (${tv.vote_count} votes)`}</p>
            </div>

        </div>
    );

}

export default TvDetails;