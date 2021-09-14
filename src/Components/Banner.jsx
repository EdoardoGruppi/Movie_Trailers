import React, { useEffect, useState } from "react";
import "./Banner.css";
import { baseImagesUrl } from "../Config";

export default function Banner({ moviesFrom }) {
  const [movie, setMovie] = useState([]);

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
          <button className="banner_button">Play</button>
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
    </header>
  );
}
