import React, { useState, useEffect, useContext } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { context } from "../../Context/Context";
import axios from "axios";

const MoviesContainer = () => {
  const [dataMovies, setDataMovies] = useState([]);
  const apiKey = "3651041388931cf01228edbff2087680";

  const { movieQuerySearch } = useContext(context);
  useEffect(() => {
    const fetchDataMovies = async () => {
      if (movieQuerySearch && movieQuerySearch.length >= 1) {
        setDataMovies(movieQuerySearch);
      } else {
        const dataMovies = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1`
        );
        setDataMovies(dataMovies.data.results);
      }
    };
    fetchDataMovies();
  }, [movieQuerySearch]);

  return (
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
  );
};

export default MoviesContainer;
