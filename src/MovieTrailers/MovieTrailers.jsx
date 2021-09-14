import { useState } from "react";
import ReactPlayer from "react-player";
import "./MovieTrailers.css";
import AutomaticSuggestions from "../Components/AutoSuggest";
import Row from "../Components/Row";
import NavBar from "../Components/NavBar";
import Banner from "../Components/Banner";

import { requests } from "../Helpers/Requests";

export default function MovieTrailers() {
  const [url, setUrl] = useState(null);
  const [modal, setModal] = useState(false);

  // Active overlay when required
  if (modal) document.body.classList.add("active-modal");
  else document.body.classList.remove("active-modal");

  return (
    <>
      <div>
        <NavBar />
        <Banner moviesFrom={requests.upcoming} />

        <Row title="Netflix Originals" fetchUrl={requests.netflixOriginals} />
        <Row title="Trending Now" fetchUrl={requests.trending} />
        <Row title="Top Rated" fetchUrl={requests.topRated} />
        <Row title="Action Movies" fetchUrl={requests.actionMovies} />
        <Row title="Adventure Movies" fetchUrl={requests.adventureMovies} />
        <Row title="Animation Movies" fetchUrl={requests.animationMovies} />
        <Row title="Horror Movies" fetchUrl={requests.horrorMovies} />
        <Row title="Thriller Movies" fetchUrl={requests.thrillerMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.comedyMovies} />
        <Row title="Documentaries" fetchUrl={requests.documentaries} />
        <Row title="Drama Movies" fetchUrl={requests.dramaMovies} />
        <Row title="War Movies" fetchUrl={requests.warMovies} />

        {modal && (
          <div className="modal">
            <div className="overlay" onClick={() => setModal(false)}>
              <div className="player-wrapper">
                <ReactPlayer url={url} playing={true} />
                <button className="close-modal" onClick={() => setModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
