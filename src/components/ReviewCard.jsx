import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import EditReview from "./EditReview";
import { AuthContext } from "../context/auth.context";
import { Card, Button, Image } from "react-bootstrap";

function generateStars(rating) {
  const stars = '★'.repeat(rating);
  return stars;
}


function ReviewCard(props) {
  const contextData = useContext(AuthContext)
  const navigate = useNavigate()
  const { gameId } = useParams()
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
    <Card bg="dark" text="white" className="card-with-spacing bright-shadow">
      <Card.Body className="text-center">
        {editMode ? (
          <EditReview {...props} setEditMode={setEditMode} />
        ) : (
          <>
            <div style={{ marginBottom: '10px' }}><strong>Created by:</strong> <br /><Link to={`/user/${props.user}`}><Image style={{ width: "3em", height: "3em", borderRadius: "50%" }} src={props && props.owner} alt={props && props.owner} /></Link></div>
            <Card.Title>{props.title}</Card.Title>
            <div style={{ marginBottom: '10px' }}>
              <strong>Review:</strong> {props.review}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Rating:</strong> <span className="yellow-stars">{generateStars(props.rating ? props.rating : 1)}</span>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Played:</strong> {props.played ? 'Yes' : 'No'}
            </div>

            {contextData.user && contextData.user._id === props.user && (
              <div className="mt-3">
                <Button variant="primary" onClick={() => setEditMode(true)}>Edit</Button>
                <span className="mx-2"></span>
                <Button variant="danger" onClick={deleteReview}>Delete</Button>
              </div>
            )}

          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ReviewCard;