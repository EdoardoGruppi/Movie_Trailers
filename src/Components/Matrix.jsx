import React, { useState } from "react";
import "./Matrix.css";
import { getTrailerUrl } from "../Helpers/Utilities";
import { baseImagesUrl } from "../Helpers/Config";
import VideoPlayer from "./VideoPlayer";
import InfoWindow from "./InfoWindow";

export default function Matrix({ movies }) {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [movieVisualized, setMovievisualized] = useState(null);

  const handleClick = (movie) => {
    setMovievisualized(movie);
    getTrailerUrl(movie).then((url) => setTrailerUrl(url));
  };

  return (
    <div className="matrix">
      <h2 className="title">Results</h2>
      <div className="matrix-posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className="matrix-poster"
            src={`${baseImagesUrl}${movie.poster_path}`}
            alt={movie.title}
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
