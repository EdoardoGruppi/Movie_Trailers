import React, { useEffect, useState } from "react";
import "./Row.css";
import { baseImagesUrl } from "../Helpers/Config";
import { getTrailerUrl, getMovieDetails } from "../Helpers/Utilities";
import VideoPlayer from "./VideoPlayer";
import InfoWindow from "./InfoWindow";

export default function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [movieVisualized, setMovievisualized] = useState(null);

  useEffect(() => {
    // With [], the function executes only once when the row loads. It does not run again.
    // Otherwise it runs also every time the variable within [] changes.
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [fetchUrl]);

  const handleClick = (movie) => {
    setMovievisualized(movie);
    getTrailerUrl(movie).then((url) => {
      url
        ? setTrailerUrl(url)
        : getMovieDetails(movie).then((data) => setInfo(data));
    });
  };

  return (
    <div className="row">
      <h2 className="title">{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            // React uses keys to optimise the rendering. If anything changes in a Row, React renders only what needed
            key={movie.id}
            onClick={() => handleClick(movie)}
            className="poster"
            src={`${baseImagesUrl}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && (
        <VideoPlayer
          trailerUrl={trailerUrl}
          setTrailerUrl={setTrailerUrl}
          setInfo={setInfo}
          movieVisualized={movieVisualized}
        />
      )}
      {info && (
        <InfoWindow
          info={info}
          setInfo={setInfo}
          movieVisualized={movieVisualized}
        />
      )}
    </div>
  );
}
