import { fetchQueryMovies } from "../services/api";

export const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const movieQuery = await fetchQueryMovies("search", {
      searchTermValue: searchTerm,
    });
    setMovieQuerySearch(movieQuery.data.results);
    if (!movieQuery.data.results.length && searchTerm !== "") {
      toast.error("No matches found, please try again", {
        duration: 1000,
        style: {
          background: "black",
          color: "white",
        },
        className: "error-toast-test",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
