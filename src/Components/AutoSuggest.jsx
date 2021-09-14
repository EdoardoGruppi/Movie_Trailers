import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { getFilmsSuggested, getTrailerUrl } from "../Helpers/utilities";
import "./AutoSuggest.css";

export default function AutomaticSuggestions(params) {
  const [value, setValue] = useState("");
  const [filmsSuggested, setFilmsSuggested] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Every time a character is inputted update the suggested films
  const onSuggestionsFetchRequested = ({ value }) => {
    getFilmsSuggested(value).then(([films, titles]) => {
      setFilmsSuggested(films);
      setSuggestions(titles);
    });
  };

  const handleChanges = (event, { newValue }) => {
    // Update the value state, i.e. the string inputted so far
    setValue(newValue);
  };

  const getSuggestionValue = (title) => {
    // When a suggestion is clicked update the input string and the parent states (url, modal)
    const film = filmsSuggested.find((item) => item.title === title);
    getTrailerUrl(film).then((data) => {
      params.setUrl(data);
      params.setModal(true);
    });
    return title;
  };

  return (
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={(suggestion) => <div>{suggestion}</div>}
        inputProps={{
          placeholder: "Insert a title",
          value,
          onChange: handleChanges,
        }}
      />
    </div>
  );
}
