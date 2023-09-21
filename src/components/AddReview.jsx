import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddReview(props) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [played, setPlayed] = useState(false);

  const {gameId} = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem('authToken'); 

    const newReview = {
      title,
      review,
      rating,
      played,
    };
console.log(newReview);
    axios
      .post(`${import.meta.env.VITE_API_URL}/games/${gameId}/reviews`, 
      newReview,
      { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        setTitle("");
        setReview("");
        setRating(""), 
        setPlayed(false);
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

        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
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
