import React, {useEffect, useState} from "react";

function ChangePages({page, setPage, movies, tvs}) {


    const handlePreviousPage = () => {
        if (page > 1) {
            return setPage(page - 1);
        }};

    const handleNextPage = () => {
        setPage(page + 1);
    };

    return (
        (movies.length || tvs.length) ? (<div>
            <p>{`${page} page`}</p>
            <button onClick={handlePreviousPage} >Previous page</button>
            <button onClick={handleNextPage}>Next page</button>
        </div>) : ""
    );
}

export default ChangePages;