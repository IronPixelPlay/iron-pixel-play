import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { Row } from "react-bootstrap";
import {Button} from "react-bootstrap";

function FilterCategories(props) {
    console.log(props);
    let games = props.gamesList
    console.log(games);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredGames, setFilteredGames] = useState(games);

  let categories = ["Action-Adventure", "Shooter", "Fighting", "Quiz&Trivia", "Other", "Strategy", "Sports&Racing", "Puzzle", "Not-Specified"];

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    filterGames();
  }, [selectedFilters]);

  const filterGames = () => {
    if (selectedFilters.length > 0) {
      let filteredGames = selectedFilters.map((selectedCategory) => {
        let selection = games.filter((game) => game.category === selectedCategory);
        return selection;
      });
      setFilteredGames(filteredGames.flat());
    } else {
      setFilteredGames([...games]);
    }
  };

  return (
    <div>
      <div className="buttons-container">
        {categories.map((category, idx) => (
          <Button
            onClick={() => handleFilterButtonClick(category)}
            variant="outline-info"
            size="lg"
            
            // {`button ${
            //   selectedFilters?.includes(category) ? "active" : ""
            // }`}
            key={`filters-${idx}`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div>
        <Row>
          {filteredGames &&
            filteredGames.map((game, idx) => (
              <div key={`game-${idx}`} className="col-md-3">
                <GameCard {...game} />
              </div>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default FilterCategories