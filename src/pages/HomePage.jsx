import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

import other from "../images/other-game.png"
import action from "../images/action-adventure.png"
import fight from "../images/fighting-game.png"
import puzzle from "../images/puzzle-game.png"
import trivia from "../images/quiz-trivia-game.png"
import shooter from "../images/shooter-game.png"
import sports from "../images/sports-racing-game2.png"
import strategy from "../images/strategy-game.png"



function HomePage() {
  return (
    <Carousel fade>

      <Carousel.Item>
      <Link to={`/games/sort/Other`}>
        <img src={other} alt="other" /> 
        <Carousel.Caption>
          <h3>Other</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        </Link>
      </Carousel.Item>

      <Carousel.Item>
      <Link to={`/games/sort/Action&Adventure`}>
      <img src={action}alt="action" />
        <Carousel.Caption>
          <h3>Action & Adventure</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
        </Link>
      </Carousel.Item>

      <Carousel.Item>
      <Link to={`/games/sort/Fighting`}>
      <img src={fight} alt="fight" />
        <Carousel.Caption>
          <h3>Fighting</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
        </Link>
      </Carousel.Item>

      <Carousel.Item>
      <Link to={`/games/sort/Puzzle`}>
      <img src={puzzle} alt="puzzle" />
        <Carousel.Caption>
          <h3>Puzzle</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
        </Link>
      </Carousel.Item>

      <Carousel.Item>
      <Link to={`/games/sort/Quiz&Trivia`}>
      <img src={trivia} alt="trivia" />
        <Carousel.Caption>
          <h3>Quiz & Trivia</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
        </Link>
      </Carousel.Item>

      <Carousel.Item>
      <Link to={`/games/sort/Shooter`}>
      <img src={shooter} alt="shooter" />
        <Carousel.Caption>
          <h3>Shooter</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
        </Link>
      </Carousel.Item>

      <Carousel.Item>
      <Link to={`/games/sort/Sports`}>
      <img src={sports} alt="sports" />
        <Carousel.Caption>
          <h3>Sports & Racing</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
        </Link>
      </Carousel.Item>

      <Carousel.Item>
        <Link to={`/games/sort/Strategy`}>
      <img src={strategy} alt="strategy" />
        <Carousel.Caption>
          <h3>Strategy</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
        </Link>
      </Carousel.Item>

    </Carousel>
  );
}

export default HomePage;