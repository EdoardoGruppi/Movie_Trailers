import { useState } from "react";
import ReactPlayer from "react-player";
import { getTrailerUrl } from "../Helpers/utilities";
import "./MovieTrailers.css";
import AutomaticSuggestions from "../Components/AutoSuggest";

export default function MovieTrailers() {
  const [url, setUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [modal, setModal] = useState(false);

  if (modal) document.body.classList.add("active-modal");
  else document.body.classList.remove("active-modal");

  return (
    <>
      <div>
        <input
          value={title}
          type="text"
          placeholder="Input a title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="btn-modal"
          onClick={() => {
            getTrailerUrl(title).then((data) => {
              setUrl(data);
              setModal(true);
            });
          }}
        >
          Search
        </button>
        <AutomaticSuggestions />
        {modal && (
          <div className="modal">
            <div className="overlay" onClick={() => setModal(false)}>
              <div className="player-wrapper">
                <ReactPlayer
                  url={url}
                  onChange={() => console.log(`Change ${url}`)}
                  playing={true}
                />
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
