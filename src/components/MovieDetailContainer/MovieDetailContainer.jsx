import React, { useEffect, useState, useContext } from "react";
import { context } from "../../Context/Context";
import ButtonMovieDetail from "../ButtonMovieDetail/ButtonMovieDetail";
import MovieTrailerContainer from "../MovieTrailerContainer/MovieTrailerContainer";
import { useNavigate } from "react-router-dom";
import noImageAvailable from "../../assets/noimg.jpeg";
import { fetchSingleMovie, fetchMovieTrailer } from "../../services/api";
import { Toaster } from "react-hot-toast";
import { pathImg } from "../../utils/images-url";
import {
  Box,
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
  const [isErr, setIsErr] = useState(false);
  const { handleFavorites, handleWatchLater, userFavorites } =
    useContext(context);

  const navigateHome = useNavigate();
  const imgMovieDetail = `${pathImg}/w342`;

  useEffect(() => {
    try {
      const fetchDataSingleMovie = async () => {
        const dataMovie = await fetchSingleMovie("movie", {
          movieId: id,
          language: "en-US",
          page: 1,
        });
        setMovieDetail(dataMovie.data);
      };
      fetchDataSingleMovie();
      const isFavoriteMovie = userFavorites.find((movie) => movie.id == id);
      setIsInFavList(isFavoriteMovie !== undefined);
    } catch (error) {
      console.log(error);
      setIsErr(true);
    }
  }, [id, userFavorites]);

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  return (
    <>
      {isErr ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1.5rem",
            color: "white",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            No data available, please try again later..
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ minHeight: "80vh" }}>
            <Container maxWidth="md">
              <Grid container spacing={4} sx={{ mt: { xs: 4, lg: 7 } }}>
                <Grid item xs={12} md={5} maxWidth="lg" sx={{ width: "100%" }}>
                  <CardMedia
                    component="img"
                    image={
                      movieDetail.poster_path
                        ? `${imgMovieDetail}${movieDetail.poster_path}`
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
                    data-test-movie-detail-img="movie-image"
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
                        data-test-movie-detail-title="detailTitle"
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
                        data-test-movie-overview="movie-detail-overview"
                      >
                        {movieDetail.overview}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Box>
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
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "white",
                            mt: 0.5,
                            marginTop: { xs: 2.5 },
                          }}
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
                        <ButtonMovieDetail
                          text={
                            isInFavList
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                          handleClick={() => handleFavorites(movieDetail)}
                          attribute={{ "data-test-add-fav-btn": "fav-btn" }}
                        />
                        <ButtonMovieDetail
                          text="Watch Later"
                          handleClick={() => handleWatchLater(movieDetail)}
                          attribute={{ "data-test-watch-btn": "watch-btn" }}
                        />
                        <ButtonMovieDetail
                          text="Go back to search"
                          handleClick={() => navigateHome("/")}
                          attribute={{ "data-test-btn-goback": "goback-btn" }}
                        />
                      </Box>
                    </CardContent>
                  </Box>
                </Grid>
              </Grid>
            </Container>
            {trailerUrl && (
              <MovieTrailerContainer
                trailerUrl={trailerUrl}
                movieDetail={movieDetail}
              />
            )}
          </Box>
          <Toaster />
        </>
      )}
    </>
  );
};

export default MovieDetailContainer;
