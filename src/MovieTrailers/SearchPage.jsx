import React, { useState } from "react";
import "./SearchPage.css";
import Matrix from "../Components/Matrix";
import SearchNavBar from "../Components/SearchNavBar";

export default function SearchPage() {
  const [movies, setMovies] = useState([]);

  return (
    <div className="search-page">
      <div className="search-page-header"></div>
      <SearchNavBar setMovies={setMovies} />
      <Matrix movies={movies}></Matrix>
    </div>
  );
}
