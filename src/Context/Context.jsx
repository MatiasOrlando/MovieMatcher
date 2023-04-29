import React, { createContext, useState } from "react";
import { fetchQueryMovies } from "../services/api";
import toast from "react-hot-toast";

export const context = createContext();
const { Provider } = context;

const Context = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userFavorites, setUserFavorites] = useState([]);
  const [userWatchLater, setUserWatchLater] = useState([]);
  const [movieQuerySearch, setMovieQuerySearch] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const movieQuery = await fetchQueryMovies("search", {
        searchTermValue: searchTerm,
      });
      setMovieQuerySearch(movieQuery.data.results);
      if (!movieQuery.data.results.length) {
        toast.error("No matches found, please try again", {
          duration: "100",
          style: {
            background: "black",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
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
