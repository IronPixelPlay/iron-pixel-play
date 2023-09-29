import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Card, Image } from 'react-bootstrap';
import ReviewList from "../components/ReviewList";
import Button from 'react-bootstrap/Button';
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
const storedToken = localStorage.getItem("authToken")
import { PacmanLoader } from "react-spinners";
import defaultImage from "../images/pacman-6450.gif";


function GameDetailsPage() {
  
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate()
  const [game, setGame] = useState(null);
  const { gameId } = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { user } = useContext(AuthContext)
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
      return (
        <div className="loader-container">
          <PacmanLoader
            color="#05ffe9"
            size={100}
          />
        </div>
      );
    }

    const handleDelete = () => {
      if (user && user.id === game.creatorId) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/games/${gameId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then(() => {
            navigate(`/games/`);
          })
          .catch((err) => console.log(err));
      }
    };

    const imageUrl = game.image || defaultImage;

    return (
      <div>
        <Card bg="dark" text="white" className="card-with-spacing bright-shadow">
          <Card.Body className="text-center">
            <Card.Title><h1>{game.title}</h1></Card.Title>
            <Card.Img style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} variant="top" src={imageUrl} alt={game.title} />

          {isLoggedIn ? (

            <div style={{ marginBottom: '10px' }}><strong>Created by:</strong> <br /><Link to={`/user/${game.user}`}><Image style={{ width: "3em", height: "3em", borderRadius: "50%" }} src={game && game.owner || defaultImage} alt={game && game.owner} /></Link></div>
            ):(
            <div style={{ marginBottom: '10px' }}><strong>Created by:</strong> <br /><Link to={`/login`}><Image style={{ width: "3em", height: "3em", borderRadius: "50%" }} src={game && game.owner || defaultImage} alt={game && game.owner} /></Link></div>

          )}
            
            <div style={{ marginBottom: '10px' }}><strong>Category:</strong> <br />{game.category}</div>
            <div style={{ marginBottom: '10px' }}><strong>Description:</strong><br />{game.description}</div>
            <div style={{ marginBottom: '10px' }}><strong>Instructions:</strong><br /> {game.instructions}</div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Visit the game's GitHub repository:</strong><br /> <a href={game.gitHubLink} target="_blank" rel="noopener noreferrer">GitHub Repository</a>
            </div>
            <div>
              <strong>Demo:</strong> <br />
              <Button variant="primary" onClick={toggleFullscreen} style={{ marginBottom: "10px", marginTop: "5px" }}>
                Play the Game in Full Screen
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
              <div>
                {game && user && game.user === user._id ? (
                  <>
                    <Link to={`/games/${gameId}/edit`} style={{ marginRight: '20px' }}>
                      <Button variant="primary" style={{ marginTop: '-60px' }}>Edit Game</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={handleDelete}
                      style={{ marginTop: '-60px' }}
                    >
                      Delete Game
                    </Button>
                  </>
                ) : <></>}
              </div>
            </div>
            <div style={{ marginTop: '30px' }}>
              <ReviewList />
            </div>
          </Card.Body>
        </Card>
      </div>
    );

  }

  return <>{renderList()}</>;
}

export default GameDetailsPage;