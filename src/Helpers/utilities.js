import { apiKey, baseUrl } from "../Config";

export async function getTrailerUrl(film) {
  // Get the youtube link to the trailer of the film
  const videoDetails = await getVideoKey(film.id);
  const youTubeKey = videoDetails.results[0].key;
  return `https://www.youtube.com/watch?v=${youTubeKey}`;
}

async function searchMovie(title) {
  // Perform the search of the movie through a specific url
  const url = `${baseUrl}/search/movie?${apiKey}&language=en-US&query=${title}&page=1`;
  return fetch(url).then((res) => res.json());
}

async function getVideoKey(movieID) {
  // Get the youtube video keys related to a film
  const url = `${baseUrl}/movie/${movieID}/videos?${apiKey}&language=en-US`;
  return fetch(url).then((res) => res.json());
}

export async function getFilmsSuggested(input, n_suggestions = 5) {
  // Search movies whose title includes a certain string
  const { results } = await searchMovie(input);
  // Get the list of the titles of the movie searched
  const suggestedTitles = results
    .map((film) => film.title)
    .slice(0, n_suggestions);
  return [results, suggestedTitles];
}
