import React, { useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddOpinion() {
  const [showInput, setShowInput] = useState(false);
  const [opinion, setOpinion] = useState("");

  const handleAddOpinion = () => {
    setShowInput(true);
  };

  const handleOpinionSubmit = (e) => {
    e.preventDefault();
    setShowInput(false);
  };

  return (
    <div className="opinion">
      <button className="btn opinion_btn" onClick={handleAddOpinion}>
        {" "}
        Add your opinion
      </button>
      {showInput && (
        <form className="opinion_form">
          <label htmlFor="opinion"> Opinion:</label>
          <input
            type="number"
            min="1"
            max="10"
            onChange={(e) => {
              setOpinion(e.target.value);
            }}
          />
          <button className="btn add_btn" onClick={handleOpinionSubmit}>
            Add
          </button>
        </form>
      )}
      {opinion && (
        <p>
          Your opinion: {opinion}{" "}
          <FontAwesomeIcon className="star_icon" icon={faStar} />
        </p>
      )}
    </div>
  );
}

export default AddOpinion;
