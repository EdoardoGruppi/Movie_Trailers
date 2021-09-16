import React from "react";
import "./VideoPlayer.css";
import closeLogo from "../Images/close.png";
import infoLogo from "../Images/info.png";
import ReactPlayer from "react-player";
import { getMovieDetails } from "../Helpers/Utilities";

export default function VideoPlayer({
  trailerUrl,
  setTrailerUrl,
  setInfo,
  movieVisualized,
}) {
  const handleInfoClick = () => {
    getMovieDetails(movieVisualized).then((data) => {
      setTrailerUrl("");
      setInfo(data);
    });
  };

  return (
    <div className="modal">
      <div className="overlay" onClick={() => setTrailerUrl("")}>
        <div className="player-wrapper">
          <ReactPlayer url={trailerUrl} playing={true} />
          <img
            src={closeLogo}
            alt={"Close logo"}
            className="close-button"
            onClick={() => setTrailerUrl("")}
          />
          <img
            src={infoLogo}
            alt={"Info logo"}
            className="info-button"
            onClick={(movie) => handleInfoClick(movie)}
          />
        </div>
      </div>
    </div>
  );
}
