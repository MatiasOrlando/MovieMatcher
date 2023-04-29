import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import noImageAvailable from "../../assets/noimg.jpeg";
import { fetchSingleMovie, fetchMovieTrailer } from "../../services/api";

const MovieDetailContainer = ({ id }) => {
  const [movieDetail, setMovieDetail] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const path = "https://image.tmdb.org/t/p/w342";
  const navigateHome = useNavigate();

  useEffect(() => {
    const fetchDataMovie = async () => {
      const dataMovie = await fetchSingleMovie("movie", {
        movieId: id,
        language: "en-US",
        page: 1,
      });
      setMovieDetail(dataMovie.data);
    };
    fetchDataMovie();
  }, [id]);

  useEffect(() => {
    const getMovieTrailers = async (id) => {
      const responseTrailers = await fetchMovieTrailer(
        "movie",
        {
          language: "en-US",
          movieId: id,
        },
        "videos"
      );
      const trailers = responseTrailers.data.results.filter(
        (video) => video.type === "Trailer"
      );
      if (trailers.length > 0) {
        const trailerKey = trailers[0].key;
        setTrailerUrl(`https://www.youtube.com/embed/${trailerKey}`);
      }
    };
    getMovieTrailers(id);
  }, [id]);

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Container maxWidth="md">
          <Grid container spacing={4} sx={{ mt: 7 }}>
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                width: "100%",
              }}
            >
              <CardMedia
                component="img"
                height="500"
                image={
                  movieDetail.poster_path
                    ? `${path}${movieDetail.poster_path}`
                    : noImageAvailable
                }
                alt={movieDetail.title}
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Box sx={{ height: "100%" }}>
                <CardContent sx={{ height: "100%" }}>
                  <Typography gutterBottom variant="h4">
                    {movieDetail.title}
                  </Typography>
                  <Typography gutterBottom variant="h6">
                    Overview:
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    {movieDetail.overview}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <div>
                      <Typography variant="body1">
                        <strong>Genres:</strong>
                      </Typography>
                      {movieDetail.genres &&
                        movieDetail.genres.map(({ name }) => (
                          <Chip key={name} label={name} sx={{ ml: 1 }} />
                        ))}
                    </div>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Vote average: </strong>
                      {isNaN(movieDetail.vote_average) ||
                      movieDetail.vote_average === 0.0
                        ? "NO RATE"
                        : parseFloat(movieDetail.vote_average).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "black" }}
                    >
                      Add to Favorites
                    </Button>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => navigateHome("/")}
                      sx={{ fontSize: "0.8rem", backgroundColor: "black" }}
                    >
                      Go back to search
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <div
          style={{
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
          />
        </div>
      </Box>
    </>
  );
};

export default MovieDetailContainer;
