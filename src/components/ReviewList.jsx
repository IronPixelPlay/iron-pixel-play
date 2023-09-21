import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

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

  return reviews === null ? (
    <h1>Loading</h1>
  ) : (
    <div>
      {reviews.map((review)=>{
          return  <ReviewCard key={review._id}{...review}/> 
      })}
    </div>
  );
}

export default ReviewList;
