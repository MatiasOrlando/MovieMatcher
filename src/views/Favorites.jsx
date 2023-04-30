import React, { useEffect, useState, useContext } from "react";
import UserFavorites from "../components/UserFavorites/UserFavorites";
import { context } from "../Context/Context";

const Favorites = () => {
  const [userFavoriteMovies, setUserFavoriteMovies] = useState([]);
  const { userFavorites } = useContext(context);
  useEffect(() => {
    const allUserFavorites = JSON.parse(localStorage.getItem("userFavorites"));
    setUserFavoriteMovies(allUserFavorites);
  }, [userFavorites]);

  return <UserFavorites userFavoriteMovies={userFavoriteMovies} />;
};

export default Favorites;
