import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import EditReview from "./EditReview";


function ReviewCard(props) {
  
  const navigate = useNavigate()
  const {gameId} = useParams()
  const [editMode, setEditMode] = useState(false)
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
    editMode ? 
      
    <EditReview {...props} setEditMode={setEditMode}/>
    :
    (<section>
      <h3>{props.title}</h3>
      <h4>Comments:</h4>
      <p>{props.review}</p>
      <h4>Rating:</h4>
      <p>{props.rating}</p>
      <h4>played:</h4>
      <p>{props.played}</p>
      <button onClick={deleteReview}>Delete</button>
      <button onClick={() => {setEditMode(true)}} >Edit</button>
      </section>
      )
  );
  }
   
  export default ReviewCard;