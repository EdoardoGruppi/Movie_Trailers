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

export async function searchMovie(title, type = "movie", page = 1) {
  // Get the URI equivalent of the inputted string
  const input = title.replace(" ", "%20");
  // Perform the search of the movie through a specific url
  const url = `${baseUrl}/search/${type}?${apiKey}&language=en-US&page=${page}&query=${input}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.results.filter((item) => item.poster_path));
}

async function searchMovieByGenre(genre, type = "movie", page = 1) {
  const key = genre.toLowerCase();
  if (key in genreDict) {
    const url = `${baseUrl}/discover/${type}?${apiKey}&language=en-US&page=${page}&with_genres=${genreDict[key]}`;
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data.results);
  } else return [];
}

async function searchActorID(person) {
  const actor = person.replace(" ", "%20");
  const url = `${baseUrl}/search/person?${apiKey}&language=en-US&query=${actor}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.results);
}

async function searchMovieByPerson(person, type = "movie", page = 1) {
  let actorID = await searchActorID(person);
  if (actorID.length > 0) actorID = actorID[0].id;
  else return [];
  const url = `${baseUrl}/discover/${type}?${apiKey}&language=en-US&page=${page}&with_people=${actorID}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.results);
}

function getUniqueObjects(firstList, secondList) {
  // Remove the movies or tv series without a poster
  secondList = secondList.filter((item) => item.poster_path !== null);
  firstList.push(...secondList);
  return [...new Map(firstList.map((item) => [item.id, item])).values()];
}

async function searchTypeResults(input, type, limit, bias = 0) {
  const functions = [searchMovie, searchMovieByGenre, searchMovieByPerson];
  let searchResults = [];
  let flag = null;
  // Search according the title, genre and actor
  for (let i = 0; i < functions.length; i++) {
    // If the amount of wanted items is already retrieved stop working
    if (searchResults.length < limit - bias) {
      const result = await functions[i](input, type);
      // If one or more items are collected push the unique ones in searchResults
      if (result.length > 0)
        searchResults = getUniqueObjects(searchResults, result);
      // If the page of results retrieved is full keep track of it
      if (result.length === 20) flag = i;
    }
  }
  // If the limit has not already been reached get an other page of
  // results with the function memorised.
  if (flag !== null && searchResults.length < limit - bias) {
    const result = await functions[flag](input, type, 2);
    if (result.length > 0)
      searchResults = getUniqueObjects(searchResults, result);
  }
  return searchResults;
}

export async function searchOverallResults(input, limit = 40) {
  const movieResults = await searchTypeResults(input, "movie", limit);
  const bias = movieResults.length;
  if (bias < limit) {
    const tvResults = await searchTypeResults(input, "tv", limit, bias);
    movieResults.push(...tvResults);
  }
  return movieResults;
}

// async function searchMovieByCompany(company, type = "movie") {
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
