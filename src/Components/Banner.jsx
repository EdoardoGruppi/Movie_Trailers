import React, { useEffect, useState } from "react";
import "./Banner.css";
import { baseImagesUrl } from "../Helpers/Config";
import { getTrailerUrl } from "../Helpers/Utilities";
import VideoPlayer from "./VideoPlayer";
import InfoWindow from "./InfoWindow";
import { getMovieDetails, truncate } from "../Helpers/Utilities";

export default function Banner({ moviesFrom }) {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [movieVisualized, setMovievisualized] = useState(null);

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

  const handleClick = (movie) => {
    setMovievisualized(movie);
    getTrailerUrl(movie).then((url) => {
      url
        ? setTrailerUrl(url)
        : getMovieDetails(movie).then((data) => setInfo(data));
    });
  };

  const handleInfoClick = (movie) => {
    setMovievisualized(movie);
    getMovieDetails(movie).then((data) => {
      setTrailerUrl("");
      setInfo(data);
    });
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
          <button
            className="banner_button"
            onClick={() => handleInfoClick(movie)}
          >
            More Info
          </button>
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
    </header>
  );
}
