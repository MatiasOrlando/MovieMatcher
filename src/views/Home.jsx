import React from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import AppPagination from "../components/AppPagination/AppPagination";

const Home = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2.5rem",
        }}
      >
        <SearchBar />
      </div>
      <MoviesContainer />
      <AppPagination />
    </>
  );
};

export default Home;
