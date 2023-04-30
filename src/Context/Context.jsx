import React, { createContext, useState, useEffect } from "react";
import { fetchQueryMovies } from "../services/api";
import toast from "react-hot-toast";

export const context = createContext();
const { Provider } = context;

const Context = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userFavorites, setUserFavorites] = useState([]);
  const [userWatchLater, setUserWatchLater] = useState([]);
  const [movieQuerySearch, setMovieQuerySearch] = useState([]);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("userFavorites");
    if (storedFavorites) {
      setUserFavorites(JSON.parse(storedFavorites));
    }
  }, [setUserFavorites]);

  useEffect(() => {
    const storedWatchLater = localStorage.getItem("userWatchLater");
    if (storedWatchLater) {
      setUserWatchLater(JSON.parse(storedWatchLater));
    }
  }, [setUserWatchLater]);

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

  const handleFavorites = (movie) => {
    const isAlreadyFavorited = userFavorites.find(
      (userMovie) => userMovie.id === movie.id
    );
    if (isAlreadyFavorited) {
      const newFavorites = userFavorites.filter(
        (userMovie) => userMovie.id !== movie.id
      );
      localStorage.setItem("userFavorites", JSON.stringify(newFavorites));
      setUserFavorites(newFavorites);
      setIsStarred(false);
      toast.error("Removed from favorites", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
      });
    } else {
      const newFavorites = [...userFavorites, movie];
      localStorage.setItem("userFavorites", JSON.stringify(newFavorites));
      setUserFavorites(newFavorites);
      setIsStarred(true);
      toast.success("Successfully added to favorites", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
      });
    }
  };

  const handleWatchLater = (movie) => {
    const isAlreadyInWatchList = userWatchLater.find(
      (userMovie) => userMovie.id === movie.id
    );
    if (!isAlreadyInWatchList) {
      const newUserWatchLater = [...userWatchLater, movie];
      localStorage.setItem("userWatchLater", JSON.stringify(newUserWatchLater));
      setUserWatchLater(newUserWatchLater);
      toast.success("Successfully added to watch list", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
      });
    } else {
      toast.error("Movie is already in watch list", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
      });
    }
  };

  const handleDeleteWatchLater = (movie) => {
    const updatedWatchList = userWatchLater.filter(
      (userMovie) => userMovie.id !== movie.id
    );
    localStorage.setItem("userWatchLater", JSON.stringify(updatedWatchList));
    setUserWatchLater(updatedWatchList);
    toast.error("Removed from watch list", {
      duration: "100",
      style: {
        background: "black",
        color: "white",
      },
    });
  };

  const valueContext = {
    setSearchTerm,
    handleSubmit,
    movieQuerySearch,
    userFavorites,
    setUserFavorites,
    userWatchLater,
    setUserWatchLater,
    setIsStarred,
    isStarred,
    handleFavorites,
    handleWatchLater,
    handleDeleteWatchLater,
  };
  return <Provider value={valueContext}>{children}</Provider>;
};

export default Context;
