import {useState} from 'react';
import {useParams} from "react-router-dom";

const SearchWParams = () => {
    const param = useParams();
    return (
        <div>
            {param.cat}
        </div>
    )
};

export default SearchWParams;