import React, { useState, useContext } from "react";
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
import { useEffect } from "react";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Tooltip from "@mui/material/Tooltip";

const MovieCard = ({ movie }) => {
  const { pathname } = useLocation();
  const pathnameClean = pathname.slice(1);
  const path = "https://image.tmdb.org/t/p/w300";
  const [isStarred, setIsStarred] = useState(false);
  const { userFavorites, setUserFavorites, userWatchLater, setUserWatchLater } =
    useContext(context);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("userFavorites");
    if (storedFavorites) {
      setUserFavorites(JSON.parse(storedFavorites));
    }
  }, [setUserFavorites]);

  useEffect(() => {
    const storedWatchLater = localStorage.getItem("userWatchLater");
    if (storedWatchLater) {
      setUserWatchLater(JSON.parse(storedWatchLater));
    }
  }, [setUserWatchLater]);

  useEffect(() => {
    setIsStarred(userFavorites.some((userMovie) => userMovie.id === movie.id));
  }, [movie.id, userFavorites]);

  const handleFavorites = (movie) => {
    if (isStarred) {
      const newFavorites = userFavorites.filter(
        (userMovie) => userMovie.id !== movie.id
      );
      localStorage.setItem("userFavorites", JSON.stringify(newFavorites));
      setUserFavorites(newFavorites);
      setIsStarred(false);
    } else {
      const newFavorites = [...userFavorites, movie];
      localStorage.setItem("userFavorites", JSON.stringify(newFavorites));
      setUserFavorites(newFavorites);
    }
  };

  const handleWatchLater = (movie) => {
    const newUserWatchLater = [...userWatchLater, movie];
    localStorage.setItem("userWatchLater", JSON.stringify(newUserWatchLater));
    setUserWatchLater(newUserWatchLater);
  };

  const handleDeleteWatchLater = (movie) => {
    const updatedWatchList = userWatchLater.filter(
      (userMovie) => userMovie.id !== movie.id
    );
    localStorage.setItem("userWatchLater", JSON.stringify(updatedWatchList));
    setUserWatchLater(updatedWatchList);
  };

  return (
    <Card
      sx={{
        width: 255,
        height: 500,
        margin: "20px 0 20px 0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="340"
        image={
          movie.poster_path ? `${path}${movie.poster_path}` : noImageAvailable
        }
      />

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
          }}
          component="div"
        >
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date}
        </Typography>
      </CardContent>
      <CardActions>
        <div>
          <ToggleButtonGroup>
            <ToggleButton
              value={isStarred}
              onClick={() => handleFavorites(movie)}
              style={{
                border: "none",
                padding: 0,
                width: "auto",
                height: "auto",
              }}
            >
              <Tooltip
                title={isStarred ? "Remove from favorites" : "Add to favorites"}
              >
                {isStarred ? (
                  <StarIcon sx={{ opacity: 0.5 }} />
                ) : (
                  <StarBorderIcon sx={{ opacity: 0.5 }} />
                )}
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>
          {pathnameClean !== "watchlater" ? (
            <ToggleButtonGroup>
              <ToggleButton
                value={""}
                style={{
                  border: "none",
                  padding: 0,
                  width: "auto",
                  height: "auto",
                }}
                onClick={() => handleWatchLater(movie)}
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
                value={""}
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
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "200px",
          }}
        >
          <div style={{ maxHeight: "20%" }}>
            <Link to={`/movies/${movie.id}`}>
              <Button size="small">Learn More</Button>
            </Link>
          </div>
        </div>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
