import React from "react";
import { Button } from "@mui/material";

const ButtonMovieDetail = ({ text, handleClick, attribute }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#21293D",
        boxShadow: "0px 3px 8px rgba(255, 255, 255, 0.3)",
        color: "white",
        marginRight: 2,
        fontSize: "0.8rem",
      }}
      onClick={handleClick}
      {...attribute}
    >
      {text}
    </Button>
  );
};

export default ButtonMovieDetail;
