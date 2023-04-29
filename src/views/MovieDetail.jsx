import React from "react";
import { useParams } from "react-router-dom";
import MovieDetailContainer from "../components/MovieDetailContainer/MovieDetailContainer";

const MovieDetail = () => {
  const { id } = useParams();
  return <MovieDetailContainer id={id} />;
};

export default MovieDetail;
