import React from "react";
import MovieCard from "../MovieCard/MovieCard";

const UserWatchLater = ({ userWatchLaterMovies }) => {
  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>My watch list</h2>
      {userWatchLaterMovies && userWatchLaterMovies.length >= 1 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            marginInline: "50px",
            marginTop: "30px",
          }}
        >
          {userWatchLaterMovies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </div>
      ) : (
        <h3 style={{ textAlign: "center" }}>Watch list is empty..</h3>
      )}
    </>
  );
};

export default UserWatchLater;
