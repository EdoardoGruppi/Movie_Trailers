import { apiKey, baseUrl } from "./Config";
import { searchMovie, searchOverallResults } from "./SearchUtilities";

// Truncate the text adding three dots if it is too long
export function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

export async function getTrailerUrl(film) {
  const type = findType(film);
  // Get the youtube link to the trailer of the film
  let videos = await getVideoKey(film.id, type);
  videos = videos.filter(
    (item) =>
      item.name.toLowerCase().includes("trailer") ||
      item.name.toLowerCase().includes("teaser")
  );
  const result =
    videos.length > 0 ? `https://www.youtube.com/watch?v=${videos[0].key}` : "";
  return result;
}

async function getVideoKey(movieID, type = "movie") {
  // Get the youtube video keys related to a film
  const url = `${baseUrl}/${type}/${movieID}/videos?${apiKey}&language=en-US`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.results);
}

export async function getFilmsSuggested(input, n_suggestions = 5) {
  // Search movies whose title includes a certain string
  const results = await searchOverallResults(input, n_suggestions);
  // Get the list of the titles of the movie searched
  let suggestedTitles = results.map((film) => film.title || film.name);
  // Delete duplicates before get n_suggestions
  suggestedTitles = [...new Set(suggestedTitles)].slice(0, n_suggestions);
  return suggestedTitles;
}

export async function getMovieDetails(movie) {
  const type = findType(movie);
  const url = `${baseUrl}/${type}/${movie.id}?${apiKey}&language=en-US`;
  return fetch(url).then((res) => res.json());
}

export function findType(item) {
  return "title" in item ? "movie" : "tv";
}
