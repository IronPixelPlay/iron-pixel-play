import EditReview from "./EditReview";

function ReviewCard({title, review, rating, played, _id, user}) {
  
  return (
    <div>
      <h3>{title}</h3>
      <h4>Comments:</h4>
      <p>{review}</p>
      <h4>Rating:</h4>
      <p>{rating}</p>
      <h4>played:</h4>
      <p>{played}</p>
    </div>
  );
  }
   
  export default ReviewCard;