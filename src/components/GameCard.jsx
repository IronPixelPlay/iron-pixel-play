import { Link } from "react-router-dom";

function GameCard({ title, description, image, _id }) {
  return (
    <div>
        <Link to={`/games/${_id}`}>
            <h3>{title}</h3>
        </Link>
        <img src={image} alt={title}/>
        <p>{description} </p>
    </div>
);
}

export default GameCard;