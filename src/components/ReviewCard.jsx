import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import EditReview from "./EditReview";


function ReviewCard(props) {
  
  const navigate = useNavigate()
  const {gameId} = useParams()

  const deleteReview = () => {

    axios
    .delete(`${import.meta.env.VITE_API_URL}/games/${gameId}/reviews/${props._id}`)   
      .then(() => {

        props.changeFunction()
        navigate(`/games/${gameId}`);
      })
      .catch((err) => console.log(err));
  };  

 
  return (
    <div>
      <h3>{props.title}</h3>
      <h4>Comments:</h4>
      <p>{props.review}</p>
      <h4>Rating:</h4>
      <p>{props.rating}</p>
      <h4>played:</h4>
      <p>{props.played}</p>

      <button onClick={deleteReview}>Delete</button>

    <EditReview {...props}/>

      {/* <button onClick={deleteReview}>Edit</button> */}
    </div>
  );
  }
   
  export default ReviewCard;