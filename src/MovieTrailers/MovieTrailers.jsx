import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { searchVideo } from "usetube";

export default function MovieTrailers() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("Insert a title");

  //   useEffect(() => {
  //     getNewUrl(title);
  //     // const [newUrl] = '';
  //     // setUrl(newUrl);
  //   }, [searchBtn]);

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={() => getNewUrl(title)}>Search</button>
      <ReactPlayer url={url}></ReactPlayer>
    </div>
  );
}

async function getNewUrl(title) {
  //   const request = await searchVideo(`${title} Official Trailer`);
  //   console.log(request);

  const url = `https://cors-anywhere.herokuapp.com/https://www.youtube.com/results?search_query=${title}+official+trailer`;
  fetch(url).then((response) => console.log(response.body));
}
