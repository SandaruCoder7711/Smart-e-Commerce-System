import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import StarRating from "./StarRating";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./css/UserAddReviews.css";

Modal.setAppElement("#root");

const UserAddReviews = () => {
  const [review, setReview] = useState({
    userName: "",
    userEmail: "",
    userReviewsByStar: 1,
    reviewMessage: "",
  });
  const [reviews, setReviews] = useState([]);
  const [ratingSummary, setRatingSummary] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [averageRating, setAverageRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setReview((prevState) => ({
      ...prevState,
      userReviewsByStar: rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:5000/review/${currentReviewId}`,
          review
        );
        alert("Review updated successfully!");
      } else {
        await axios.post("http://localhost:5000/review", review);
        alert("Review added successfully!");

        // Send review details via email
        await axios.post(
          "http://localhost:5000/review_mail/review_send-email",
          {
            email: review.userEmail,
            subject: "Thank you for your review!",
            message: `Thank you, ${review.userName}, for your review! Here's what you submitted:\n\nRating: ${review.userReviewsByStar} stars\nReview: ${review.reviewMessage}`,
          }
        );
      }
      resetForm();
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
    }
  };

  const resetForm = () => {
    setReview({
      userName: "",
      userEmail: "",
      userReviewsByStar: 1,
      reviewMessage: "",
    });
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/review");
      const data = Array.isArray(response.data) ? response.data : [];
      setReviews(data);
      calculateRatingSummary(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const calculateRatingSummary = (reviewsArray) => {
    const summary = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;

    reviewsArray.forEach((review) => {
      summary[review.userReviewsByStar]++;
      totalRating += review.userReviewsByStar;
    });

    setRatingSummary(summary);
    setAverageRating(totalRating / reviewsArray.length || 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`http://localhost:5000/review/${id}`);
        alert("Review deleted successfully!");
        fetchReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review");
      }
    }
  };

  const handleEdit = (review) => {
    setReview(review);
    setCurrentReviewId(review._id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const renderStarIcons = (starCount) => {
    return Array.from({ length: starCount }, (_, i) => (
      <FaStar key={i} className="star-icon" />
    ));
  };

  const renderAverageStars = (avgRating) => {
    const fullStars = Math.floor(avgRating);
    const hasHalfStar = avgRating % 1 !== 0;

    return (
      <>
        {Array.from({ length: fullStars }, (_, i) => (
          <FaStar key={i} className="star-icon" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="star-icon" />}
      </>
    );
  };

  return (
    <div className="user-reviews-container">
      <h2>User Reviews</h2>

      <button
        className="open-modal-button"
        onClick={() => setIsModalOpen(true)}
      >
        {isEditing ? "Edit Review" : "Add Review"}
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setIsEditing(false);
        }}
        className="review-modal"
        overlayClassName="review-modal-overlay"
      >
        <h2>{isEditing ? "Edit Your Review" : "Add Your Review"}</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="text"
            name="userName"
            value={review.userName}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="userEmail"
            value={review.userEmail}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <label>Your Rating:</label>
          <StarRating
            rating={review.userReviewsByStar}
            onRatingChange={handleRatingChange}
          />
          <textarea
            name="reviewMessage"
            value={review.reviewMessage}
            onChange={handleChange}
            placeholder="Your Review"
            required
          ></textarea>
          <button type="submit">
            {isEditing ? "Update Review" : "Submit Review"}
          </button>
        </form>
        <button
          className="close-modal-button"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </Modal>

      <h3>All Reviews</h3>
      <div className="reviews-list">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-item">
              <div className="review-details">
                <div className="review-header">
                  <h4 className="review-username">{review.userName}</h4>
                  <p className="review-message">{review.reviewMessage}</p>
                </div>
                <div className="review-rating">
                  {Array.from({ length: review.userReviewsByStar }, (_, i) => (
                    <span key={i} className="star-icon">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <div className="review-actions">
                <FaEdit
                  className="edit-icon"
                  onClick={() => handleEdit(review)}
                />
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDelete(review._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>

      <h3>Rating Summary</h3>
      <div className="rating-summary">
        <div>
          <span>
            1 Star: {renderStarIcons(1)} {ratingSummary[1]}
          </span>
        </div>
        <div>
          <span>
            2 Stars: {renderStarIcons(2)} {ratingSummary[2]}
          </span>
        </div>
        <div>
          <span>
            3 Stars: {renderStarIcons(3)} {ratingSummary[3]}
          </span>
        </div>
        <div>
          <span>
            4 Stars: {renderStarIcons(4)} {ratingSummary[4]}
          </span>
        </div>
        <div>
          <span>
            5 Stars: {renderStarIcons(5)} {ratingSummary[5]}
          </span>
        </div>
        <div>
          <span>
            Average Rating: {renderAverageStars(averageRating)} (
            {averageRating.toFixed(1)} Stars)
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserAddReviews;
