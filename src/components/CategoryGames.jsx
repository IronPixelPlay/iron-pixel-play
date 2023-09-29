import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GameCard from "./GameCard"
import { Row } from "react-bootstrap"
import { PacmanLoader } from "react-spinners";

function CategoryGames() {

  const [sortedGames, setSortedGames] = useState(null)
  const {category} = useParams()

  const getGamesByCategory = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/games/sort/${category}`)
      .then((response) => {
        setSortedGames(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getGamesByCategory()
  }, [category])


  return sortedGames === null ? (
    <div className="loader-container">
      <PacmanLoader color="#05ffe9" size={100} />
    </div>
  ) : (
    <Row>
      <h1>{category}</h1>
      {sortedGames.map((game, idx) => {
        return (
          <div key={`sort-${idx}`} className="col-md-3">
            <GameCard {...game} />
          </div>
        );
      })}
    </Row>
  );

}

export default CategoryGames