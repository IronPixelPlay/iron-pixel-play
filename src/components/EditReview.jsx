import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

 
 
function EditReview(props) {
  
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [played, setPlayed] = useState("");

  const navigate = useNavigate();
  const gameId = useParams();
  const reviewId = props._id

  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_API_URL}/games/${gameId}/reviews/${props._id}`)
      .then((response) => {
        
        const reviewToEdit = response.data;
        setTitle(reviewToEdit.title);
        setReview(reviewToEdit.review);
        setRating(reviewToEdit.rating);
        setPlayed(reviewToEdit.played);
      })
      .catch((error) => console.log(error));
    
  }, [reviewId]);


  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, review, rating, played };
    axios
    .put(`${import.meta.env.VITE_API_URL}/games/${props.game}/reviews/${reviewId}`, requestBody)
      .then((response) => {
        props.setEditMode(false)
        props.refreshReviews()
        navigate(`/games/${props.game}`)
      })
      .catch((err) => console.log(err));
  };
  


  return (
    <div>
      <h3>Edit Review</h3>

      <form onSubmit={handleFormSubmit}>
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
          min={1}
          max={5}
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
 
export default EditReview;
