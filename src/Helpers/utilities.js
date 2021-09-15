import { apiKey, baseUrl } from "./Config";

const genreDict = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  sciFi: 878,
  tV: 10770,
  thriller: 53,
  war: 10752,
  western: 37,
};

export async function getTrailerUrl(film) {
  // Get the youtube link to the trailer of the film
  const videoDetails = await getVideoKey(film.id);
  const youTubeKey = videoDetails.results[0].key;
  return `https://www.youtube.com/watch?v=${youTubeKey}`;
}

async function searchMovie(title) {
  // Perform the search of the movie through a specific url
  const url = `${baseUrl}/search/movie?${apiKey}&language=en-US&query=${title}`;
  return fetch(url).then((res) => res.json());
}

// async function searchMovieByGenre(genre) {
//   const key = genre.toLowerCase();
//   if (key in genreDict) {
//     const url = `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=${genreDict[key]}`;
//     return fetch(url)
//       .then((res) => res.json())
//       .then((data) => data.results);
//   } else return [];
// }

// async function searchMovieByPerson(person) {
//   const actor = person.replace(" ", "%20");
//   let url = `${baseUrl}/search/person?${apiKey}&language=en-US&query=${actor}`;
//   fetch(url)
//     .then((res) => res.json())
//     .then(async (data) => {
//       if (data.results.length > 0) {
//         const id = data.results[0].id;
//         url = `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_people=${id}`;
//         return fetch(url)
//           .then((res) => res.json())
//           .then((data) => data.results);
//       }
//     });
// }

// async function searchMovieByCompany(company) {
//   const companyName = company.replace(" ", "%20");
//   let url = `${baseUrl}/search/company?${apiKey}&query=${companyName}`;
//   fetch(url)
//     .then((res) => res.json())
//     .then(async (data) => {
//       if (data.results.length > 0) {
//         const id = data.results[0].id;
//         url = `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_companies=${id}`;
//         return fetch(url)
//           .then((res) => res.json())
//           .then((data) => data.results);
//       }
//     });
// }

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

export async function getSearchResults(input) {
  // Search through the title
  const { results } = await searchMovie(input);
  return results;
}
