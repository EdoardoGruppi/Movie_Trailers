import React, { useEffect, useState } from "react";
import "./Row.css";
import { baseImagesUrl } from "../Config";

export default function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // With [], the function executes only once when the row loads. It does not run again.
    // Otherwise it runs also every time the variable within [] changes.
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2 className="title">{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            // React uses keys to optimise the rendering. If anything changes in a Row, React renders only what needed
            key={movie.id}
            className="poster"
            src={`${baseImagesUrl}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}
