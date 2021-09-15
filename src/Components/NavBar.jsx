import React, { useEffect, useState } from "react";
import "./NavBar.css";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Handle the bar background-color effect when scrolling over 100px
    const listener = window.addEventListener("scroll", () => {
      if (window.scrollY > 150) setShow(true);
      else setShow(false);
    });
    // Every time useEffect gets fired out for some reason remove the listener
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        src={logo}
        alt={
          "https://fontmeme.com/permalink/210914/b9f5d3be0b5197a3faf22def9ff9dbba.png"
        }
        className="logo"
      />
      <Link to="/search" className="search-button"></Link>
    </div>
  );
}
