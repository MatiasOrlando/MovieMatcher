import React, { useEffect, useState, useContext } from "react";
import { context } from "../Context/Context";
import UserSelection from "../components/UserSelection/UserSelection";

const WatchLater = () => {
  const [userWatchLaterMovies, setUserWatchLaterMovies] = useState([]);
  const { userWatchLater } = useContext(context);

  useEffect(() => {
    const allUserWatchLater = JSON.parse(
      localStorage.getItem("userWatchLater")
    );
    setUserWatchLaterMovies(allUserWatchLater);
  }, [userWatchLater]);

  return <UserSelection movies={userWatchLaterMovies} type="watch list" />;
};

export default WatchLater;
