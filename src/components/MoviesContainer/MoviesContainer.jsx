import React, { useState, useEffect, useContext } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { context } from "../../Context/Context";
import { fetchTrendyMovies } from "../../services/api";
import { Toaster } from "react-hot-toast";
const MoviesContainer = () => {
  const [dataMovies, setDataMovies] = useState([]);
  const { movieQuerySearch } = useContext(context);

  useEffect(() => {
    const fetchDataMovies = async () => {
      try {
        if (movieQuerySearch && movieQuerySearch.length >= 1) {
          setDataMovies(movieQuerySearch);
        } else {
          const dataMovies = await fetchTrendyMovies("discover", {
            language: "en-US",
            page: 1,
          });
          setDataMovies(dataMovies.data.results);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataMovies();
  }, [movieQuerySearch]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginInline: "50px",
          marginTop: "30px",
        }}
      >
        {dataMovies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
      <Toaster />
    </>
  );
};

export default MoviesContainer;
