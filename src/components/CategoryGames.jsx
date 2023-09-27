import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GameCard from "./GameCard"
import { Row } from "react-bootstrap"

function CategoryGames() {

    const [sortedGames, setSortedGames] = useState(null)
    const {category} = useParams()
    
    const getGamesByCategory = () =>

    axios.get(`${import.meta.env.VITE_API_URL}/games/sort/${category}`)
    .then((response)=>{
        console.log(response.data);
        setSortedGames(response.data)
    })
    .catch((error) => {
        console.log(error);
      });

    useEffect(()=>{
        getGamesByCategory()
    }, [])

    return sortedGames === null ? (
        <h1>No games to display</h1>
    ) : (
        <Row>

        <h1>{category}</h1>
        {sortedGames.map((game, idx)=>{
            return (
                <div key={`sort-${idx}`} className="col-md-3">
                <GameCard {...game} />
                </div>
            )
        })}
        </Row>
    )
     
 }
 
 export default CategoryGames