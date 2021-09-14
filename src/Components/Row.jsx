import React, { useEffect, useState } from "react";
import "./Row.css";
import "./VideoPlayer.css";
import { baseImagesUrl } from "../Config";
import ReactPlayer from "react-player";
import { getTrailerUrl } from "../Helpers/Utilities";
import closeLogo from "../close.png";

export default function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    // With [], the function executes only once when the row loads. It does not run again.
    // Otherwise it runs also every time the variable within [] changes.
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [fetchUrl]);

  const handleClick = (movie) => {
    getTrailerUrl(movie)
      .then((url) => setTrailerUrl(url))
      .catch((error) => console.log(error));
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
