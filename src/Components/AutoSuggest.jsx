import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import { getFilmsSuggested } from "../Helpers/Utilities";
import "./AutoSuggest.css";
import { requests } from "../Helpers/Requests";
import { searchOverallResults } from "../Helpers/SearchUtilities";

export default function AutomaticSuggestions({ setMovies }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(requests.trending)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
    window.addEventListener("keydown", handleKeyDown);
    // Every time useEffect gets fired out for some reason remove the listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    const input = e.target.defaultValue;
    if (e.key === "Enter" && input.length !== 0)
      searchOverallResults(input).then((result) => setMovies(result));
  };

  // Every time a character is inputted update the suggested films
  const onSuggestionsFetchRequested = ({ value }) => {
    getFilmsSuggested(value).then((titles) => {
      setSuggestions(titles);
    });
  };

  const handleChanges = (event, { newValue }) => {
    // Update the value state, i.e. the string inputted so far
    setValue(newValue);
  };

  return (
    <div style={{ display: "flex" }}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={(title) => title}
        renderSuggestion={(suggestion) => <div>{suggestion}</div>}
        inputProps={{
          placeholder: "Insert a keyword and press Enter",
          value,
          onChange: handleChanges,
        }}
      />
    </div>
  );
}
