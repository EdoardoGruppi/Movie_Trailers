import React, { useEffect, useState } from "react";
import "./Row.css";
import { baseImagesUrlw200 } from "../Helpers/Config";
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

  const scrollLeft = (e) => {
    const line_id = 'line' + e.target.id.slice(5);
    document.getElementById(line_id).scrollLeft += 700;
  }

  const scrollRight = (e) => {
    const line_id = 'line' + e.target.id.slice(5);
    document.getElementById(line_id).scrollLeft -= 700;
  }

  return (
    <div className="row">
      <h2 className="title">{title}</h2>
      <div className="row_posters" id={`line ${title}`}>
        {movies.map((movie) => (
          <img
            // React uses keys to optimise the rendering. If anything changes in a Row, React renders only what needed
            key={movie.id}
            onClick={() => handleClick(movie)}
            className="poster"
            src={`${baseImagesUrlw200}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
        <div className="handle left-arrow" id={`cont0 ${title}`} onClick={(e) => scrollRight(e)}>
          <div className="icon-left" id={`hand0 ${title}`} onClick={(e) => scrollRight(e)}>
            <i className = "fa-solid fa-angle-left" id={`icon0 ${title}`} onClick={(e) => scrollRight(e)}></i>
          </div>
        </div>
        <div className="handle right-arrow" id={`cont1 ${title}`} onClick={(e) => scrollLeft(e)}>
          <div className="icon-right" id={`hand1 ${title}`} onClick={(e) => scrollLeft(e)}>
            <i className = "fa-solid fa-angle-right" id={`icon1 ${title}`} onClick={(e) => scrollLeft(e)}></i>
          </div>
        </div>

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
