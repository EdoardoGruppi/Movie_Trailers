import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./Banner.css";
import closeLogo from "../Images/close.png";
import { baseImagesUrl } from "../Helpers/Config";
import { getTrailerUrl } from "../Helpers/Utilities";

export default function Banner({ moviesFrom }) {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    fetch(moviesFrom)
      .then((res) => res.json())
      .then((data) => {
        setMovie(
          // Randomly select one film from the list obtained
          data.results[Math.floor(Math.random() * data.results.length - 1)]
        );
      });
  }, [moviesFrom]);

  // Truncate the text adding three dots if it is too long
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleClick = (movie) => {
    getTrailerUrl(movie)
      .then((url) => setTrailerUrl(url))
      .catch((error) => console.log(error));
  };

  return (
    <header
      className="banner"
      style={{
        // Use all of the size of the background container
        backgroundSize: "cover",
        // The ?. helps to handle if the field of the obj is undefined
        backgroundImage: `url(${baseImagesUrl}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button" onClick={() => handleClick(movie)}>
            Play
          </button>
          <button className="banner_button">More Info</button>
        </div>
        <div className="description">
          <h1 className="banner_description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
      </div>
      {/* Add fade effect at the bottom of the banner */}
      <div className="banner_fade_bottom"></div>
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
    </header>
  );
}
