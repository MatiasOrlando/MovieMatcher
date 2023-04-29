import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const context = createContext();
const { Provider } = context;

const Context = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userFavorites, setUserFavorites] = useState([]);
  const [userWatchLater, setUserWatchLater] = useState([]);
  const [movieQuerySearch, setMovieQuerySearch] = useState([]);
  const apiKey = "3651041388931cf01228edbff2087680";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieQuery = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
    );
    setMovieQuerySearch(movieQuery.data.results);
  };

  const valueContext = {
    setSearchTerm,
    handleSubmit,
    movieQuerySearch,
    userFavorites,
    setUserFavorites,
    userWatchLater,
    setUserWatchLater,
  };
  return <Provider value={valueContext}>{children}</Provider>;
};

export default Context;
