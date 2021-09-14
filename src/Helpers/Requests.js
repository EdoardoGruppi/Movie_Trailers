import { baseUrl, apiKey } from "../Config";

// For the genre codes the following link ihas been used:
// https://gist.github.com/courville/548469b86ae9294f9e98cbb52273a1db

export const requests = {
  upcoming: `${baseUrl}/movie/upcoming?${apiKey}&language=en-US`,
  trending: `${baseUrl}/trending/all/week?${apiKey}&language=en-US`,
  netflixOriginals: `${baseUrl}/discover/tv?${apiKey}&language=en-US&with_networks=213`,
  topRated: `${baseUrl}/movie/top_rated?${apiKey}&language=en-US`,
  actionMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=28`,
  adventureMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=12`,
  animationMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=16`,
  comedyMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=35`,
  crimeMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=80`,
  documentaries: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=99`,
  dramaMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=18`,
  familyMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=10751`,
  fantasyMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=14`,
  historyMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=36`,
  horrorMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=27`,
  musicMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=10402`,
  misteryMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=9648`,
  romanceMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=10749`,
  scifiMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=878`,
  tvMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=10770`,
  thrillerMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=53`,
  warMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=10752`,
  westernMovies: `${baseUrl}/discover/movie?${apiKey}&language=en-US&with_genres=37`,
};
