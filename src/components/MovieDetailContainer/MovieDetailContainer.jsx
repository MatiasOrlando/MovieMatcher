import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noImageAvailable from "../../assets/noimg.jpeg";
import { fetchSingleMovie, fetchMovieTrailer } from "../../services/api";
import { context } from "../../Context/Context";
import { Toaster } from "react-hot-toast";
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

const MovieDetailContainer = ({ id }) => {
  const [movieDetail, setMovieDetail] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isInFavList, setIsInFavList] = useState(false);

  const path = "https://image.tmdb.org/t/p/w342";
  const navigateHome = useNavigate();
  const { handleFavorites, handleWatchLater, userFavorites } =
    useContext(context);

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
  }, [id, userFavorites]);

  useEffect(() => {
    const getMovieTrailers = async (id) => {
      const responseTrailers = await fetchMovieTrailer("movie", {
        language: "en-US",
        movieId: id,
        videos: "videos",
      });
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

  useEffect(() => {
    const isFavorite = userFavorites.find((movie) => movie.id == id);
    setIsInFavList(isFavorite !== undefined);
  }, [id, userFavorites]);

  return (
    <>
      <Box sx={{ minHeight: "80vh" }}>
        <Container maxWidth="md">
          <Grid container spacing={4} sx={{ mt: { xs: 4, lg: 7 } }}>
            <Grid item xs={12} md={5} maxWidth="lg" sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                image={
                  movieDetail.poster_path
                    ? `${path}${movieDetail.poster_path}`
                    : noImageAvailable
                }
                alt={movieDetail.title}
                sx={{
                  margin: "0 auto",
                  height: {
                    xs: "350px",
                    sm: "350px",
                    md: "500px",
                  },
                  width: { xs: "auto", sm: "auto", md: "100%" },
                  objectFit: "cover",
                  textAlign: "center",
                }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Box sx={{ height: "100%" }}>
                <CardContent sx={{ height: "100%" }}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    sx={{
                      color: "white",
                      fontSize: {
                        xs: "1.5rem",
                        sm: "1.7rem",
                        md: "2rem",
                      },
                    }}
                  >
                    {movieDetail.title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{
                      color: "white",
                      fontSize: {
                        xs: "1rem",
                        sm: "1rem",
                        md: "1rem",
                      },
                    }}
                  >
                    <strong>Overview:</strong>
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    sx={{
                      color: "white",
                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.9rem",
                        md: "1rem",
                      },
                    }}
                  >
                    {movieDetail.overview}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <div>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        <strong>Genres:</strong>
                      </Typography>
                      {movieDetail.genres &&
                        movieDetail.genres.map(({ name }) => (
                          <Chip
                            key={name}
                            label={name}
                            sx={{
                              backgroundColor: "white",
                              ml: 1,
                              marginTop: { xs: 1.5 },
                              color: "black",
                              opacity: 0.9,
                            }}
                          />
                        ))}
                    </div>
                    <Typography
                      variant="body1"
                      sx={{ color: "white", mt: 0.5, marginTop: { xs: 2.5 } }}
                    >
                      <strong>Vote average: </strong>
                      {isNaN(movieDetail.vote_average) ||
                      movieDetail.vote_average === 0.0
                        ? "NO RATE"
                        : parseFloat(movieDetail.vote_average).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      mt: {
                        xs: 4,
                        lg: 6,
                      },
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#21293D",
                        boxShadow: "0px 3px 8px rgba(255, 255, 255, 0.3)",
                        color: "white",
                        marginRight: 2,

                        fontSize: "0.8rem",
                      }}
                      onClick={() => handleFavorites(movieDetail)}
                    >
                      {isInFavList
                        ? "Remove from favorites"
                        : "Add to Favorites"}
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#21293D",
                        boxShadow: "0px 3px 8px rgba(255, 255, 255, 0.3)",
                        color: "white",
                        marginRight: 2,
                        fontSize: "0.8rem",
                      }}
                      onClick={() => handleWatchLater(movieDetail)}
                    >
                      Watch later
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => navigateHome("/")}
                      sx={{
                        backgroundColor: "#21293D",
                        boxShadow: "0px 3px 8px rgba(255, 255, 255, 0.3)",
                        color: "white",
                        marginRight: 1,
                        fontSize: "0.8rem",
                      }}
                    >
                      Go back to search
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Container>
        {trailerUrl && (
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
            />
          </Box>
        )}
      </Box>
      <Toaster />
    </>
  );
};

export default MovieDetailContainer;
