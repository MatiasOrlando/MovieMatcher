import React, { useState, useContext, useEffect } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, Link } from "react-router-dom";
import noImageAvailable from "../../assets/noimg.jpeg";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { context } from "../../Context/Context";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Tooltip from "@mui/material/Tooltip";
import { Toaster } from "react-hot-toast";
import { pathImg } from "../../utils/images-url";

const MovieCard = ({ movie, i }) => {
  const { pathname } = useLocation();
  const pathnameClean = pathname.slice(1);
  const imgMovieCard = `${pathImg}/w300`;
  const [isStarOn, setIsStarOn] = useState(false);

  const {
    userFavorites,
    handleFavorites,
    handleDeleteWatchLater,
    handleWatchLater,
  } = useContext(context);

  useEffect(() => {
    setIsStarOn(userFavorites.some((userMovie) => userMovie.id === movie.id));
  }, [movie.id, userFavorites]);

  return (
    <>
      <Card
        sx={{
          width: 255,
          height: "500px",
          margin: "20px 0 20px 0px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: "perspective(1000px) rotateY(0deg)",
          transition: "transform 0.5s",
          "&:hover": {
            transform: "scale(1.1)",
            border: "3px solid white",
          },
        }}
        data-test-query-search="movie-card-search"
      >
        <Link to={`/movies/${movie.id}`}>
          <CardMedia
            component="img"
            alt={movie.title}
            height="360"
            image={
              movie.poster_path
                ? `${imgMovieCard}${movie.poster_path}`
                : noImageAvailable
            }
          />
        </Link>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            sx={{
              fontSize: "1.1em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              width: "100%",
              boxSizing: "border-box",
              paddingRight: "20px",
              alignItems: "flex-start",
              height: "3.75em",
              lineHeight: "1.2em",
              maxHeight: "2.4em",
              minHeight: "2.4em",
            }}
            component="div"
            data-test-movie-card-title="moviecardtitle"
            data-test-star-card-title={i}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            data-test-card-release-date={i}
          >
            {movie.release_date}
          </Typography>
        </CardContent>
        <CardActions sx={{ pl: "12px" }}>
          <Box>
            <ToggleButtonGroup>
              <Tooltip
                title={isStarOn ? "Remove from favorites" : "Add to favorites"}
              >
                <ToggleButton
                  value={isStarOn}
                  onClick={() => handleFavorites(movie)}
                  style={{
                    border: "none",
                    padding: 0,
                    width: "auto",
                    height: "auto",
                  }}
                  data-test-star-fav={i}
                >
                  {isStarOn ? (
                    <StarIcon color="warning" sx={{ opacity: 0.5 }} />
                  ) : (
                    <StarBorderIcon sx={{ opacity: 0.5 }} />
                  )}
                </ToggleButton>
              </Tooltip>
            </ToggleButtonGroup>
          </Box>
          <Box>
            {pathnameClean !== "watchlater" ? (
              <ToggleButtonGroup>
                <ToggleButton
                  value=""
                  style={{
                    border: "none",
                    padding: 0,
                    width: "auto",
                    height: "auto",
                  }}
                  onClick={() => {
                    handleWatchLater(movie);
                  }}
                >
                  <Tooltip title="Add to watch list">
                    <WatchLaterOutlinedIcon
                      fontSize="small"
                      color="disabled"
                      sx={{ paddingTop: "0.1em" }}
                    />
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>
            ) : (
              <ToggleButtonGroup>
                <ToggleButton
                  value=""
                  style={{
                    border: "none",
                    padding: 0,
                    width: "auto",
                    height: "auto",
                  }}
                  onClick={() => handleDeleteWatchLater(movie)}
                >
                  <Tooltip title="Remove from watch list">
                    <DeleteForeverOutlinedIcon color="disabled" />
                  </Tooltip>
                </ToggleButton>{" "}
              </ToggleButtonGroup>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
            }}
          >
            <Box sx={{ maxHeight: "20%" }}>
              <Link to={`/movies/${movie.id}`}>
                <Button size="small">Learn More</Button>
              </Link>
            </Box>
          </Box>
        </CardActions>
      </Card>
      <Toaster />
    </>
  );
};

export default MovieCard;
