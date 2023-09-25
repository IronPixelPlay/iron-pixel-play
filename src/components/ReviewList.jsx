import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import AddReview from "./AddReview";

const averageStarRating = (averageRating) => {
  return '★'.repeat(Math.round(averageRating));
};

function ReviewList() {
  const [reviews, setReviews] = useState(null);
  const { gameId } = useParams();

  const getAllReviews = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/games/${gameId}/reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  const playedSum = reviews && reviews.filter((review) => review.played).length;

  const averageRating =
    reviews &&
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const averageRatingStars = averageStarRating(averageRating);

  return reviews === null ? (
    <h1>Loading</h1>
  ) : (
    <div>
      <section style={{marginTop:"20px", marginBottom:"-90px"}}>
        <h2>Played by {playedSum}</h2>
        <h2>Average rating: <span className="yellow-stars">{averageRatingStars}</span></h2>
      </section>

      <AddReview refreshReviews={getAllReviews} />
      {reviews.map((review) => {
        return (
          <ReviewCard
            key={review._id}
            {...review}
            refreshReviews={getAllReviews}
          />
        );
      })}
    </div>
  );
}

export default ReviewList;
