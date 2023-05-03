import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Box } from "@mui/material";

const UserSelection = ({ movies, type }) => {
  const title = type === "favorites" ? "My favorites list" : "My watch list";
  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
        {title}
      </h2>
      {movies && movies.length >= 1 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            marginInline: "50px",
            marginTop: "30px",
          }}
          data-test-user-movies="movies-user"
        >
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </Box>
      ) : (
        <h3
          style={{ textAlign: "center", marginTop: "20px", color: "white" }}
          data-test-selection-user="user-selection"
        >
          No {type} added yet..
        </h3>
      )}
    </>
  );
};

export default UserSelection;
