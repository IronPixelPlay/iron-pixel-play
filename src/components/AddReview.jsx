import { useContext, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";

function AddReview(props) {
  const { isLoggedIn } = useContext(AuthContext)
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
    <Container fluid className="d-flex align-items-center justify-content-center" >
      <Card bg="dark" text="white" className="bright-shadow" style={{ width: "700px" }}>
        {isLoggedIn ? (
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Col xs={12} sm={8} md={6}>
              <h3 className="text-center" style= {{marginTop: "20px"}}>Add Review</h3>
              <Form.Group controlId="title" style={{ marginBottom: "10px" }}>
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" value={title} required onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="rating" style={{ marginBottom: "10px" }}>
                <Form.Label>Rating:</Form.Label>
                <Rating
                  ratingValue={rating}
                  onClick={handleRating}
                  onPointerEnter={() => {}}
                  onPointerLeave={() => {}}
                  onPointerMove={() => {}}
                />
              </Form.Group>

              <Form.Group controlId="review" style={{ marginBottom: "10px" }}>
                <Form.Label>Review:</Form.Label>
                <Form.Control as="textarea" value={review} onChange={(e) => setReview(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="played">
                <Form.Check type="checkbox" label="Played" checked={played} onChange={(e) => setPlayed(e.target.checked)} />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit" style={{ marginBottom: "10px", marginTop: "5px" }}>
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        ) : (
          <div className="alert alert-warning" style={{ backgroundColor: "black", color: "white" }}>
            You must be <Link to="/login" style={{ color: "white" }}>logged in</Link> to leave a review.
          </div>
        )}
      </Card>
    </Container>
  );

}

export default AddReview;
