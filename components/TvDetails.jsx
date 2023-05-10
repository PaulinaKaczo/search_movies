import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {faStar} from "@fortawesome/free-solid-svg-icons";


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

        <div className="details">
            <div className="image-container">
            <img src={`https://image.tmdb.org/t/p/w400${tv.poster_path}`} alt={tv.title}/>
        </div>
            <div className='description'>
                <h2>{tv.name}</h2>
                <p>{tv.overview}</p>
                <p className='average_note'><strong>Average: </strong> {tv.vote_average}<FontAwesomeIcon className="star_icon" icon={faStar}/></p>
                <p className='votes'>{`(${tv.vote_count} votes)`}</p>
            </div>

        </div>
    );

}

export default TvDetails;