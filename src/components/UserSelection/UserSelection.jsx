import React from "react";
import MovieCard from "../MovieCard/MovieCard";

const UserSelection = ({ movies, type }) => {
  const title = type === "favorites" ? "My favorites list" : "My watch list";
  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
        {title}
      </h2>
      {movies && movies.length >= 1 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            marginInline: "50px",
            marginTop: "30px",
          }}
        >
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </div>
      ) : (
        <h3 style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
          No {type} added yet..
        </h3>
      )}
    </>
  );
};

export default UserSelection;
