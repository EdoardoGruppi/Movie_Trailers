import React from "react";
import "./SearchNavBar.css";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import AutomaticSuggestions from "./AutoSuggest";

export default function SearchNavBar({ setMovies }) {
  return (
    <div className={"search-nav"}>
      <Link to="/" className="back-button"></Link>
      <AutomaticSuggestions setMovies={setMovies} />
      <img
        src={logo}
        alt={
          "https://fontmeme.com/permalink/210914/b9f5d3be0b5197a3faf22def9ff9dbba.png"
        }
        className="search-nav-logo"
      />
    </div>
  );
}
