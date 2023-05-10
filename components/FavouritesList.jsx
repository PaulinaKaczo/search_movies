import React from "react";

function FavouritesList({favouritesMovie, favouritesTV}) {


    return (
        // (!favouritesMovie.length || !favouritesTV.length) ? '' :
            <div className='favourites_box'>
            <p>Favourite Movies: </p>
            <ul>
                {favouritesMovie.map(({id, title}) => (
                    <li key={id}> { title } </li>
                ))}
            </ul>

            <p>Favourite TV Series: </p>
            <ul>
                {favouritesTV.map(({id, name}) => (
                    <li key={id}> { name } </li>
                ))}
            </ul>
        </div>
    );
}

export default FavouritesList;