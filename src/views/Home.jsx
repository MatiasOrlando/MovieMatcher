import React from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";

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
    </>
  );
};

export default Home;
