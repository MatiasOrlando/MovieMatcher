import React, { useState, useEffect, useContext } from "react";
import { context } from "../../Context/Context";
import MovieCard from "../MovieCard/MovieCard";
import { fetchTrendyMovies } from "../../services/api";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";

const MoviesContainer = () => {
  const [dataMovies, setDataMovies] = useState([]);
  const { movieQuerySearch, page, setPagination } = useContext(context);

  useEffect(() => {
    const fetchDataMovies = async () => {
      try {
        if (movieQuerySearch && movieQuerySearch.length >= 1) {
          setDataMovies(movieQuerySearch);
          setPagination(false);
        } else {
          const dataMovies = await fetchTrendyMovies("discover", {
            language: "en-US",
            page: `${page}`,
          });
          setDataMovies(dataMovies.data.results);
          setPagination(true);
        }
      } catch (error) {
        console.error(error);
        setPagination(false);
      }
    };
    fetchDataMovies();
  }, [movieQuerySearch, page]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginInline: "50px",
          marginTop: "30px",
        }}
        id="moviesContainer"
      >
        {dataMovies.map((movie, i) => {
          return <MovieCard key={movie.id} movie={movie} i={i} />;
        })}
      </Box>
      <Toaster />
    </>
  );
};

export default MoviesContainer;
