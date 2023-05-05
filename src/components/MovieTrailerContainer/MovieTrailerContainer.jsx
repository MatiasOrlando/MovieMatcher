import React from "react";
import { Box } from "@mui/material";

const MovieTrailerContainer = ({ trailerUrl, movieDetail }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "70px 0px 50px 0px",
      }}
    >
      <iframe
        width="560"
        height="315"
        src={trailerUrl}
        title="Trailer"
        allowFullScreen
        className="trailerMovie"
        alt={movieDetail.title}
      />
    </Box>
  );
};

export default MovieTrailerContainer;
