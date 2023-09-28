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
import image from "../images/pixel.png"



function HomePage() {

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ marginTop: "20px" }}>Welcome to IronPixelPlay <img src={image} alt="IronPixelPlay" style={{ width: "1em", height: "1em", marginLeft: "5px" }} /></h1>
      </div>
      <p style={{ color: "white", fontWeight: "bold" }}>Discover a hub exclusively for Ironhack's web development bootcampers! This platform is your canvas to proudly display your Module 1 game and delve into the world of your fellow Ironhackers' creations. When you upload your game, categorize it into genres such as action-adventure, puzzle, and many more. Let's come together to celebrate your coding journey and explore the universe of gaming!</p>
      <Carousel fade style={{ marginTop: "30px" }}>

        <Carousel.Item style={{ maxHeight: '80vh' }}>
          <Link to={`/games/sort/Other`}>
            <img src={other} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt='other' />
            <Carousel.Caption>
              <h3>Other</h3>
              <p>A diverse collection of unique and unconventional games.</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item style={{ maxHeight: '80vh' }}>
          <Link to={`/games/sort/Action&Adventure`}>
            <img src={action} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="action" />
            <Carousel.Caption>
              <h3>Action & Adventure</h3>
              <p>Thrilling journeys and epic quests await in these games.</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item style={{ maxHeight: '80vh' }}>
          <Link to={`/games/sort/Fighting`}>
            <img src={fight} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="fight" />
            <Carousel.Caption>
              <h3>Fighting</h3>
              <p>
                Test your combat skills in intense battles.
              </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item style={{ maxHeight: '80vh' }}>
          <Link to={`/games/sort/Puzzle`}>
            <img src={puzzle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="puzzle" />
            <Carousel.Caption>
              <h3>Puzzle</h3>
              <p>
                Engaging brain-teasers and mind-challenging puzzles.
              </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item style={{ maxHeight: '80vh' }}>
          <Link to={`/games/sort/Quiz&Trivia`}>
            <img src={trivia} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="trivia" />
            <Carousel.Caption>
              <h3>Quiz & Trivia</h3>
              <p>
                Quick thinking and knowledge-testing games.
              </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item style={{ maxHeight: '80vh' }}>
          <Link to={`/games/sort/Shooter`}>
            <img src={shooter} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="shooter" />
            <Carousel.Caption>
              <h3>Shooter</h3>
              <p>
                Fast-paced action and sharpshooting challenges.
              </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item style={{ maxHeight: '80vh' }}>
          <Link to={`/games/sort/Sports`}>
            <img src={sports} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="sports" />
            <Carousel.Caption>
              <h3>Sports & Racing</h3>
              <p>
                Adrenaline-pumping sports and high-speed racing.
              </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item style={{ maxHeight: '80vh' }}>
          <Link to={`/games/sort/Strategy`}>
            <img src={strategy} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="strategy" />
            <Carousel.Caption>
              <h3>Strategy</h3>
              <p>
                Plan and strategize your way to victory.
              </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

      </Carousel>
    </>
  );
}

export default HomePage;