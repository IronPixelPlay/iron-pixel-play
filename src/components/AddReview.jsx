import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

function AddReview(props) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [played, setPlayed] = useState(false);

  const {gameId} = useParams()
  
  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    const storedToken = localStorage.getItem('authToken'); 

    const newReview = {
      title,
      review,
      rating,
      played,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/games/${gameId}/reviews`, 
      newReview,
      { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        setTitle("");
        setReview("");
        setRating(0), 
        setPlayed(false);
        props.refreshReviews()
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Add Review</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <Rating
          ratingValue={rating}
          onClick={handleRating}
          onPointerEnter={() => {}}
          onPointerLeave={() => {}}
          onPointerMove={() => {}}
        />

        <label>Review:</label>
        <textarea
          type="text"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <label>Played:</label>

        <input
          type="checkbox"
          name="played"
          checked={played}
          onChange={(e) => setPlayed(e.target.checked)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );

}

export default AddReview;
