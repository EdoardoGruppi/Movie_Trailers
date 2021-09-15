import React, { useState } from "react";
import "./Matrix.css";
import "./Row.css";
import { getTrailerUrl } from "../Helpers/Utilities";
import { baseImagesUrl } from "../Helpers/Config";
import closeLogo from "../Images/close.png";
import ReactPlayer from "react-player";

export default function Matrix({ movies }) {
  const [trailerUrl, setTrailerUrl] = useState("");

  const handleClick = (movie) => {
    getTrailerUrl(movie)
      .then((url) => setTrailerUrl(url))
      .catch((error) => console.log(error));
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
        <div className="modal">
          <div className="overlay" onClick={() => setTrailerUrl("")}>
            <div className="player-wrapper">
              <ReactPlayer url={trailerUrl} playing={true} />
              <img
                src={closeLogo}
                alt={
                  "https://fontmeme.com/permalink/210914/f2752e7a5b43ecc7c518f9609c9587dd.png"
                }
                className="close-button"
                onClick={() => setTrailerUrl("")}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
