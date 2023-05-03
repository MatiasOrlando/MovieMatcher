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
  const [pagination, setPagination] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const storedLocalFavorites = localStorage.getItem("userFavorites");
    if (storedLocalFavorites) {
      setUserFavorites(JSON.parse(storedLocalFavorites));
    }
  }, []);

  useEffect(() => {
    const storedLocalWatchLater = localStorage.getItem("userWatchLater");
    if (storedLocalWatchLater) {
      setUserWatchLater(JSON.parse(storedLocalWatchLater));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const movieQuery = await fetchQueryMovies("search", {
        searchTermValue: searchTerm,
      });
      setMovieQuerySearch(movieQuery.data.results);
      if (!movieQuery.data.results.length && searchTerm !== "") {
        toast.error("No matches found, please try again", {
          duration: 1000,
          style: {
            background: "black",
            color: "white",
          },
          className: "error-toast-test",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavorites = (movie) => {
    const isFavMovie = userFavorites.find(
      (userMovie) => userMovie.id === movie.id
    );
    if (isFavMovie) {
      const newFavorites = userFavorites.filter(
        (userMovie) => userMovie.id !== movie.id
      );
      localStorage.setItem("userFavorites", JSON.stringify(newFavorites));
      setUserFavorites(newFavorites);

      toast.error("Removed from favorites", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
        className: "removeFav-toast-test",
      });
    } else {
      const newFavorites = [...userFavorites, movie];
      localStorage.setItem("userFavorites", JSON.stringify(newFavorites));
      setUserFavorites(newFavorites);

      toast.success("Successfully added to favorites", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
        className: "success-add-toast-test",
      });
    }
  };

  const handleWatchLater = (movie) => {
    const isWatchListMovie = userWatchLater.find(
      (userMovie) => userMovie.id === movie.id
    );
    if (!isWatchListMovie) {
      const newUserWatchLater = [...userWatchLater, movie];
      localStorage.setItem("userWatchLater", JSON.stringify(newUserWatchLater));
      setUserWatchLater(newUserWatchLater);
      toast.success("Successfully added to watch list", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
        className: "success-watch-toast-test",
      });
    } else {
      toast.error("Movie is already in watch list", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
        className: "remove-watch-movie-toast-test",
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
    searchTerm,
    setSearchTerm,
    handleSubmit,
    movieQuerySearch,
    userFavorites,
    setUserFavorites,
    userWatchLater,
    setUserWatchLater,
    handleFavorites,
    handleWatchLater,
    handleDeleteWatchLater,
    page,
    setPage,
    setPagination,
    pagination,
  };
  return <Provider value={valueContext}>{children}</Provider>;
};

export default Context;
