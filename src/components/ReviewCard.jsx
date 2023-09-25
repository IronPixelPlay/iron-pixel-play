import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";

import EditReview from "./EditReview";
import { AuthContext } from "../context/auth.context";

function generateStars(rating) {
  const stars = '★'.repeat(rating);
  return stars;
}


function ReviewCard(props) {
  const contextData = useContext(AuthContext)
  const navigate = useNavigate()
  const {gameId} = useParams()
  const [editMode, setEditMode] = useState(false)
  const deleteReview = () => {

    axios
    .delete(`${import.meta.env.VITE_API_URL}/games/${gameId}/reviews/${props._id}`)   
      .then(() => {

        props.refreshReviews()
        navigate(`/games/${gameId}`);
      })
      .catch((err) => console.log(err));
  };  

 
  return (
    editMode ? 
      
    <EditReview {...props} setEditMode={setEditMode}/>
    :
    (<section>
      <h3>{props.title}</h3>
      <h4>Comments:</h4>
      <p>{props.review}</p>
      <h4>Rating:</h4>
      <p className="yellow-stars">{generateStars(props.rating)}</p>
      <h4>played:</h4>
      <p>{props.played}</p>
      
      {contextData.user._id === props.user && (
      <div>
      <button onClick={() => {setEditMode(true)}} >Edit</button>
      <button onClick={deleteReview}>Delete</button>
      </div>
      )
      
      }


      </section>
      )
  );
  }
   
  export default ReviewCard;