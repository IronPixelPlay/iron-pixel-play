import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

 
 
function EditReview(props) {
  
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
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

  const handleRating = (rate) => {
    setRating(rate);
  };

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
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card bg="dark" text="white" className="bright-shadow" style={{ width: "700px" }}>
        <Form onSubmit={handleFormSubmit}>
          <Row className="justify-content-center">
            <Col xs={12} sm={8} md={6}>
              <h3 className="text-center" style={{ marginTop: "20px" }}>
                {reviewId ? "Edit Review" : "Add Review"}
              </h3>
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

              <Form.Group controlId="reviewText" style={{ marginBottom: "10px" }}>
                <Form.Label>Review:</Form.Label>
                <Form.Control as="textarea" value={review} onChange={(e) => setReview(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="played">
                <Form.Check type="checkbox" label="Played" checked={played} onChange={(e) => setPlayed(e.target.checked)} />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit" style={{ marginBottom: "10px", marginTop: "5px" }}>
                  {reviewId ? "Update" : "Submit"}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}
 
export default EditReview;