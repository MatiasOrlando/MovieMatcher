import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Box, Typography } from "@mui/material";

const UserSelection = ({ movies, type }) => {
  const title = type === "favorites" ? "My favorites list" : "My watch list";
  return (
    <>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginTop: "50px", color: "white" }}
      >
        {title}
      </Typography>
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
        <Typography
          variant="h6"
          align="center"
          sx={{ marginTop: "20px", color: "white" }}
          data-test-selection-user="user-selection"
        >
          No {type} added yet..
        </Typography>
      )}
    </>
  );
};

export default UserSelection;
