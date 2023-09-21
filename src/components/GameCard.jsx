import { Link } from "react-router-dom";

function GameCard({ title, description, _id }) {
  return (
    <div>
        <Link to={`/games/${_id}`}>
            <h3>{title}</h3>
        </Link>
        <p>{description} </p>
    </div>
);
}

export default GameCard;