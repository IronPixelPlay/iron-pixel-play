import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import AddReview from "../components/AddReview";

function GameDetailsPage() {

  const [game, setGame] = useState(null);
  const { gameId } = useParams();

  const getGame = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/games/${gameId}`)
      .then((response) => {
        console.log(response.data)
        setGame(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGame();
  }, [gameId]);

  const renderList = () => {
    if (game === null) {
      return <h1>Loading</h1>;
    }

    return (
      <div>
        <h1>{game.title}</h1>
        <img src={game.image} alt={game.title} />
        <p>Category: {game.category}</p>
        <p>Description:{game.description}</p>
        <p>Instructions: {game.instructions}</p>
        <p>Demo: <Link>{game.demo}</Link></p>
        <p>GitHub-Link: <Link>{game.gitHubLink}</Link></p>
        <AddReview/>
      </div>
    );
  }
  return <>{renderList()}</>;
}

  export default GameDetailsPage;