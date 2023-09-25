import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Card } from 'react-bootstrap';
import ReviewList from "../components/ReviewList";
import Button from 'react-bootstrap/Button';


function GameDetailsPage() {

  const [game, setGame] = useState(null);
  const { gameId } = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('gameIframe');
    if (iframe) {
      if (!isFullscreen) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }

      setIsFullscreen(!isFullscreen);
    }
  };

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
            <div style={{ marginBottom: '10px' }}><strong>Category:</strong> <br />{game.category}</div>
            <div style={{ marginBottom: '10px' }}><strong>Description:</strong><br />{game.description}</div>
            <div style={{ marginBottom: '10px' }}><strong>Instructions:</strong><br /> {game.instructions}</div>
            <div style={{ marginBottom: '10px' }}>
              <strong>GitHub-Link:</strong> <a href={game.gitHubLink}>GitHub</a>
            </div>
            <div>
              <strong>Demo:</strong> <br />
              <Button variant="primary" onClick={toggleFullscreen} style={{ marginBottom: "10px", marginTop: "10px" }}>
                Play the Game in Fullscreen
              </Button>
              <div style={{ overflow: "hidden", height: "500px" }}>
                <iframe
                  src={game.demo}
                  title={game.title}
                  width="90%"
                  height="90%"
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: "relative", top: 0, left: 0 }}
                  id="gameIframe"
                ></iframe>
              </div>
            </div>
          </Card.Body>
        </Card>

        <ReviewList />
      </div>
    );
  }

  return <>{renderList()}</>;
}

export default GameDetailsPage;