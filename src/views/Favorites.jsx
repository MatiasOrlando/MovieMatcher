import React, { useEffect, useState, useContext } from "react";
import { context } from "../Context/Context";
import UserSelection from "../components/UserSelection/UserSelection";

const Favorites = () => {
  const [userFavoriteMovies, setUserFavoriteMovies] = useState([]);
  const { userFavorites } = useContext(context);
  useEffect(() => {
    const allUserFavorites = JSON.parse(localStorage.getItem("userFavorites"));
    setUserFavoriteMovies(allUserFavorites);
  }, [userFavorites]);

  return <UserSelection movies={userFavoriteMovies} type="favorites" />;
};

export default Favorites;
