import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const fetchQueryMovies = (endpoint, params) => {
  const { searchTermValue } = params;
  const url = `${baseUrl}/${endpoint}/movie?api_key=${apiKey}&query=${searchTermValue}`;
  return axios.get(url);
};

export const fetchTrendyMovies = (endpoint, params) => {
  const { language, page } = params;
  const url = `${baseUrl}/${endpoint}/movie?api_key=${apiKey}&language=${language}&page=${page}`;
  return axios.get(url);
};
