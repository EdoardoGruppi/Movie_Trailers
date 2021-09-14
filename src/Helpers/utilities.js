import { apiKey, baseUrl } from "../Config";

export async function getTrailerUrl(title) {
  const { results } = await searchMovie(title);
  //////////////////////////////////////////////////////
  // Now we will consider only the first of the search
  const videoDetails = await getVideoKey(results[0].id);
  const youTubeKey = videoDetails.results[0].key;
  return `https://www.youtube.com/watch?v=${youTubeKey}`;
}

export async function searchMovie(title) {
  const url = `${baseUrl}/search/movie?${apiKey}&language=en-US&query=${title}&page=1`;
  return fetch(url).then((res) => res.json());
}

export async function getVideoKey(movieID) {
  const url = `${baseUrl}/movie/${movieID}/videos?${apiKey}&language=en-US`;
  return fetch(url).then((res) => res.json());
}

export async function getFilmsSuggested(input, n_suggestions = 5) {
  const { results } = await searchMovie(input);
  const suggestedTitles = results
    .map((film) => {
      return film.title;
    })
    .slice(0, n_suggestions);
  return suggestedTitles;
}
