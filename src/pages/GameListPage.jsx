import React, { useEffect, useState } from "react";
import axios from "axios";

import AddGame from "../components/AddGame";
import GameCard from "../components/GameCard";

function GameListPage() {
  const [games, setGames] = useState(null);

  const getAllGames = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/games`)
      .then((response) => {
        console.log(response.data);
        setGames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllGames();
  }, []);

  const renderList = () => {
    if (games === null) {
      return <h1>Loading</h1>;
    }

    return (
      <div>
        <AddGame refreshGames={getAllGames} />

        {games.map((game) => (
          <GameCard key={game._id} {...game} />
        ))}
      </div>
    );
  };

  return <>{renderList()}</>;
}

export default GameListPage;