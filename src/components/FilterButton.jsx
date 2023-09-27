import { Button } from "react-bootstrap";
import { useState } from "react";

function FilterButton(props) {
  const [buttonState, setButtonState] = useState(false);

  const handleStateButton = () => {
    setButtonState((buttonState) => !buttonState);
  };

  const toggleButtonStateClass = buttonState ? " active" : "";

  return (
    <Button
      onClick={() => {
        handleStateButton();
        props.filterCategories(props.category);
      }}
      variant="outline-info"
      size="lg"
      className={toggleButtonStateClass}
    >
      {props.category}
    </Button>
  );
}

export default FilterButton;
