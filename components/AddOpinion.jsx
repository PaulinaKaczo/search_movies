import {useState} from "react";

function AddOpinion() {
    const [showInput, setShowInput] = useState(false);
    const [opinion, setOpinion] = useState('');

    const handleAddOpinion = () => {
        setShowInput(true);
    }

    const handleOpinionSubmit =(e) => {
        e.preventDefault();
        setShowInput(false);
    }

    return (
        <div>
            <button onClick={handleAddOpinion}> Add your opinion</button>
            {showInput && (
                <form>
                    <label htmlFor="opinion"> Opinion:</label>
                    <input type="number" min='1' max='10' onChange={(e) => {setOpinion(e.target.value)}}/>
                        <button onClick ={handleOpinionSubmit}>Add</button>
                </form>
            )}
            {opinion && <p>Your opinion: {opinion}</p>}
        </div>
    );
}

export default AddOpinion;