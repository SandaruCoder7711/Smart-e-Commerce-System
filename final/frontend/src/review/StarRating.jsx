import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./css/StarRating.css";

const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (starValue) => {
    onRatingChange(starValue);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          className={star <= rating ? "star filled" : "star"}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
