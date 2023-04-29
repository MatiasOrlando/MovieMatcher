import React, { useEffect, useState, useContext } from "react";
import { context } from "../Context/Context";
import UserWatchLater from "../components/UserWatchLater/UserWatchLater";

const WatchLater = () => {
  const [userWatchLaterMovies, setUserWatchLaterMovies] = useState([]);
  const { userWatchLater } = useContext(context);
  useEffect(() => {
    const allUserWatchLater = JSON.parse(
      localStorage.getItem("userWatchLater")
    );
    setUserWatchLaterMovies(allUserWatchLater);
  }, [userWatchLater]);
  return <UserWatchLater userWatchLaterMovies={userWatchLaterMovies} />;
};

export default WatchLater;
