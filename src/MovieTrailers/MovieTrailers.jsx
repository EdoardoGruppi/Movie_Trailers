import { useState } from "react";
import ReactPlayer from "react-player";
import "./MovieTrailers.css";
import AutomaticSuggestions from "../Components/AutoSuggest";

export default function MovieTrailers() {
  const [url, setUrl] = useState(null);
  const [modal, setModal] = useState(false);

  // Active overlay when required
  if (modal) document.body.classList.add("active-modal");
  else document.body.classList.remove("active-modal");

  return (
    <>
      <div>
        <AutomaticSuggestions setUrl={setUrl} setModal={setModal} />
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
