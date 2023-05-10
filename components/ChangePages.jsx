import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";


function ChangePages({page, setPage, movies, tvs}) {


    const handlePreviousPage = () => {
        if (page > 1) {
            return setPage(page - 1);
        }};

    const handleNextPage = () => {
        setPage(page + 1);
    };

    return (
        (movies.length || tvs.length) ? (<div className='change_pages'>
            <p>{page}</p>
            <div className='arrow_btn'>
            <button onClick={handlePreviousPage} ><FontAwesomeIcon icon={faArrowLeft} /></button>
            <button onClick={handleNextPage}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </div>) : ""
    );
}

export default ChangePages;