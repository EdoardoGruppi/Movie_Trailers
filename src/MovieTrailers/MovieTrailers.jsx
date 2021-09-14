import React from "react";
import "./MovieTrailers.css";
import Row from "../Components/Row";
import NavBar from "../Components/NavBar";
import Banner from "../Components/Banner";
import { requests } from "../Helpers/Requests";

export default function MovieTrailers() {
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
      </div>
    </>
  );
}
