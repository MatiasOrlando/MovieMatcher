import React from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import AppPagination from "../components/AppPagination/AppPagination";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2.5rem",
        }}
      >
        <SearchBar />
      </Box>
      <MoviesContainer />
      <AppPagination />
    </>
  );
};

export default Home;
