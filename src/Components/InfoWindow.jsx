import React from "react";
import closeLogo from "../Images/close.png";
import youTubeLogo from "../Images/youtube.svg";
import filmLogo from "../Images/film.svg";
import { baseImagesUrl } from "../Helpers/Config";
import { truncate } from "../Helpers/Utilities";
import "./InfoWindow.css";
import "./VideoPlayer.css";

export default function InfoWindow({ info, setInfo, movieVisualized }) {
  return (
    <div className="modal">
      <div className="overlay" onClick={() => setInfo(null)}>
        <div className="player-wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="info-container">
            <div className="box a">
              <h2 className="text info-title">{truncate(info.title, 30)}</h2>
              <h4 className="text info-tagline">
                {truncate(info.tagline, 64)}
              </h4>
            </div>
            <img
              src={`${baseImagesUrl}${movieVisualized.poster_path}`}
              alt="Movie poster"
              className="box b"
            />
            <div className="box c">
              <h4 className="text info-title">Overview</h4>
              <p className="text info-overview">
                {truncate(info.overview, 380)}
              </p>
            </div>
            <div className="box d">
              <h4 className="info-title-score">Vote Avg.</h4>
              <p className="info-score">{`${info.vote_average} out of 10`}</p>
              <h4 className="info-title-score">Vote Count</h4>
              <p className="info-score">{`${info.vote_count} users`}</p>
              <h4 className="info-title-score">Popularity</h4>
              <p className="info-score">{info.popularity}</p>
            </div>
            <div className="box e">
              <h4 className="text info-title">Release Date</h4>
              <p className="text info-release-date">
                {truncate(info.release_date ? info.release_date : "", 362)}
              </p>
            </div>
            <div className="box f">
              <div className="info-money-container">
                <h4 className="info-title-money">Budget: </h4>
                <p className="info-money">{`${
                  info.budget === 0
                    ? "Not known"
                    : info.budget.toLocaleString("en-US")
                } $`}</p>
              </div>
              <div className="info-money-container">
                <h4 className="info-title-money">Revenue: </h4>
                <p className="info-money">{`${
                  info.revenue === 0
                    ? "Not known"
                    : info.revenue.toLocaleString("en-US")
                } $`}</p>
              </div>
              <div className="info-money-container">
                <h4 className="info-title-money">Links: </h4>
                <a
                  className="info-link-youtube"
                  href={`https://www.youtube.com/results?search_query=${info.title.replace(
                    " ",
                    "+"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={youTubeLogo}
                    alt="Youtube"
                    className="info-link-icon"
                  />
                </a>
                {info.homepage && (
                  <a
                    href={info.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      style={{ "margin-left": "5px" }}
                      src={filmLogo}
                      alt="Youtube"
                      className="info-link-icon"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
          <img
            src={closeLogo}
            alt={"Close logo"}
            className="close-button"
            onClick={() => setInfo(null)}
          />
        </div>
      </div>
    </div>
  );
}
