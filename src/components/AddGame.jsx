import { useState } from "react";
import axios from "axios";
import service from "../services/file-upload.service"

function AddGame(props) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [demo, setDemo] = useState("");
  const [category, setCategory] = useState("");
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();

    uploadData.append("image", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then(response => {
        setImage(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem('authToken');

    const newGame = {
      title,
      image,
      demo,
      category,
      instructions,
      description,
      gitHubLink
    };

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/games`,
        newGame,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setTitle("");
        setImage("");
        setDemo(""),
          setCategory("")
        setInstructions("")
        setDescription("");
        setGitHubLink("")
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Add Game</h3>

      <form onSubmit={handleSubmit}>

        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Image:</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />

        <label>Demo:</label>
        <input
          type="text"
          name="demo"
          value={demo}
          required
          onChange={(e) => setDemo(e.target.value)}
        />

        <label>Category:</label>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Not Specified">Select</option>
          <option value="Action">Action</option>
          <option value="Shooting">Shooting</option>
          <option value="Adventure">Adventure</option>
          <option value="Trivia">Trivia</option>
        </select>

        <label>Instructions:</label>
        <textarea
          type="text"
          name="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Git Hub Link:</label>
        <input
          type="text"
          name="gitHubLink"
          value={gitHubLink}
          required
          onChange={(e) => setGitHubLink(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddGame;