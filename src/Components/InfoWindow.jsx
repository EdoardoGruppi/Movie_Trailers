import React, { useEffect, useState } from "react";
import closeLogo from "../Images/close.png";
import youTubeLogo from "../Images/youtube.svg";
import filmLogo from "../Images/film.svg";
import { baseImagesUrlw300 } from "../Helpers/Config";
import { truncate, findType } from "../Helpers/Utilities";
import "./InfoWindow.css";
import "./VideoPlayer.css";

export default function InfoWindow({ info, setInfo, movieVisualized }) {
  const [type, setType] = useState("");

  useEffect(() => {
    setType(findType(info)); 
    // eslint-disable-next-line
  }, []);

  return (
    <div className="modal">
      <div className="overlay" onClick={() => setInfo(null)}>
        <div className="player-wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="info-container">
            <div className="box a">
              <h2 className="text info-title">
                {truncate(info.title || info.name, 30)}
              </h2>
              <h4 className="text info-tagline">
                {truncate(info.tagline, 64)}
              </h4>
            </div>
            <img
              src={`${baseImagesUrlw300}${movieVisualized.poster_path}`}
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
            {/* ///////////////////////////////// */}
            {/* If the item considered is a movie */}
            {type === "movie" && (
              <div className="box e">
                <h4 className="text info-title">Release Date</h4>
                <p className="text info-release-date">{info?.release_date}</p>
              </div>
            )}
            {type === "movie" && (
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
                    {" "}
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
            )}
            {/* ////////////////////////////////////////////// */}
            {/* Otherwise if the item evaluated is a tv series */}
            {type === "tv" && (
              <div className="box e">
                <h4 className="text info-title">Last Air Date</h4>
                <p className="text info-release-date">{info.last_air_date}</p>
              </div>
            )}
            {type === "tv" && (
              <div className="box f">
                <div className="info-money-container">
                  <h4 className="info-title-money">Seasons: </h4>
                  <p className="info-money">{info.number_of_seasons}</p>
                </div>
                <div className="info-money-container">
                  <h4 className="info-title-money">N. Episodes: </h4>
                  <p className="info-money">{info.number_of_episodes}</p>
                </div>
                <div className="info-money-container">
                  <h4 className="info-title-money">Links: </h4>
                  <a
                    className="info-link-youtube"
                    href={`https://www.youtube.com/results?search_query=${info.name.replace(
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
                        style={{ marginLeft: "5px" }}
                        src={filmLogo}
                        alt="Youtube"
                        className="info-link-icon"
                      />
                    </a>
                  )}
                </div>
              </div>
            )}
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
