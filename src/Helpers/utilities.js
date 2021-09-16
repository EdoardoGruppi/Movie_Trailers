import { apiKey, baseUrl } from "./Config";

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

async function searchMovie(title, page = 1, type = "movie") {
  // Get the URI equivalent of the inputted string
  const input = title.replace(" ", "%20");
  // Perform the search of the movie through a specific url
  const url = `${baseUrl}/search/${type}?${apiKey}&language=en-US&page=${page}&query=${input}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.results.filter((item) => item.poster_path));
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
  const results = await searchMovie(input);
  // Get the list of the titles of the movie searched
  let suggestedTitles = results.map((film) => film.title);
  // Delete duplicates before get n_suggestions
  suggestedTitles = [...new Set(suggestedTitles)].slice(0, n_suggestions);
  return [results, suggestedTitles];
}

export async function getSearchResults(input) {
  // Get the first page of results
  const results = await searchMovie(input, 1);
  // If the maximum n of items in the 1° page are returned get also the 2° page
  if (results.length === 20) {
    const additionalResults = await searchMovie(input, 2);
    if (additionalResults.length > 0) results.push(...additionalResults);
  }
  return results;
}

export async function getMovieDetails(movie) {
  const type = findType(movie);
  const url = `${baseUrl}/${type}/${movie.id}?${apiKey}&language=en-US`;
  return fetch(url).then((res) => res.json());
}

export function findType(item) {
  return "title" in item ? "movie" : "tv";
}

// export async function createNewPoster(title) {
//   const url = 'https://source.unsplash.com/collection/1319040';
//   const image =
// }

// const genreDict = {
//   action: 28,
//   adventure: 12,
//   animation: 16,
//   comedy: 35,
//   crime: 80,
//   documentary: 99,
//   drama: 18,
//   family: 10751,
//   fantasy: 14,
//   history: 36,
//   horror: 27,
//   music: 10402,
//   mystery: 9648,
//   romance: 10749,
//   sciFi: 878,
//   tV: 10770,
//   thriller: 53,
//   war: 10752,
//   western: 37,
// };

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
