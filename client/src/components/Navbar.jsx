import { useState } from "react";
import "./Navbar.css";
import * as React from 'react';
import Button from "../components/Button";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsNavOpen(false);
  };

  const handleNavOpenClick = () => {
    setIsNavOpen(true);
    setIsSearchOpen(false);
  };

  const handleNavCloseClick = () => {
    setIsNavOpen(false);
  };

  return (
    <nav
      className={`nav ${isSearchOpen ? "openSearch" : ""} ${
        isNavOpen ? "openNav" : ""
      }`}
    >
      <i className="uil uil-bars navOpenBtn" onClick={handleNavOpenClick}></i>
      <a href="/#" className="logo">
        Lensify
      </a>

      <div className="tabs">
        <ul className="nav-links">
        <i
          className="uil uil-times navCloseBtn"
          onClick={handleNavCloseClick}
        ></i>
        <li>
          <a href="/#">Home</a>
        </li>
        <li>
          <a href="/core">Info</a>
        </li>
        <li>
          <a href="trust">Tours</a>
        </li>
        <li>
          <a href="trust">Gallery</a>
        </li>
        <li>
          <a href="/aboutus">About Us</a>
        </li>
      </ul>
      </div>

      <a href="/login" className="login"><Button variant="contained" className="white" >Login</Button></a>
      <div className={`search-box ${isSearchOpen ? "openSearch" : ""}`}>
        <i className="uil uil-search search-icon"></i>
        <input type="text" placeholder="Search here..." />
      </div>
    </nav>
  );
};

export default Navbar;
