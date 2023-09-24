import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Card } from 'react-bootstrap';
import ReviewList from "../components/ReviewList";

function GameDetailsPage() {

  const [game, setGame] = useState(null);
  const { gameId } = useParams();

  const getGame = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/games/${gameId}`)
      .then((response) => {
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
        <Card bg="dark" text="white" className="card-with-spacing bright-shadow">
          <Card.Body className="text-center">
            <Card.Title><h1>{game.title}</h1></Card.Title>
            <Card.Img style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} variant="top" src={game.image} alt={game.title} />
            <Card.Text><strong>Category:</strong> <p>{game.category}</p></Card.Text>
            <Card.Text><strong>Description:</strong> <p>{game.description}</p></Card.Text>
            <Card.Text><strong>Instructions:</strong> <p>{game.instructions}</p></Card.Text>
            <Card.Text>
            <strong>Demo:</strong> <p><a href={game.demo}>Play Demo</a></p>
            </Card.Text>
            <Card.Text>
              <strong>GitHub-Link:</strong><p><a href={game.gitHubLink}>GitHub</a></p>
            </Card.Text>
          </Card.Body>
        </Card>

        <ReviewList />
      </div>
    );
  }
  return <>{renderList()}</>;
}

export default GameDetailsPage;