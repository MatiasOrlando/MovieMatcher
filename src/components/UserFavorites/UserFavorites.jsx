import React from "react";
import MovieCard from "../MovieCard/MovieCard";

const UserFavorites = ({ userFavoriteMovies }) => {
  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
        My favorites
      </h2>
      {userFavoriteMovies && userFavoriteMovies.length >= 1 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            marginInline: "50px",
            marginTop: "30px",
          }}
        >
          {userFavoriteMovies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </div>
      ) : (
        <h3 style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
          No favorites added yet..
        </h3>
      )}
    </>
  );
};

export default UserFavorites;
