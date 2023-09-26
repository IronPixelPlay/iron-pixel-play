import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const errorHandler = (err) => {
  throw err;
};

const getGames = () => {
  return api.get("/games")
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return api.post("/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};

const createGame = (newGame) => {
  return api.post("/games", newGame)
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  getGames,
  uploadImage,
  createGame
};
