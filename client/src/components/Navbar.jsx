import { useState } from "react";
import "./Navbar.css";
import * as React from 'react';
import Button from "../components/Button";
import { Link } from 'react-scroll';

const Navbar = ({ links }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
      <i className="uil uil-bars navOpenBtn" onClick={handleNavOpenClick}>This</i>
      <a href="/#" className="logo">
        Lensify
      </a>

      <div className="tabs">
        <ul className="nav-links">
          <i
          className="uil uil-times navCloseBtn"
          onClick={handleNavCloseClick}
        >close</i>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.to} smooth={true}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="login"><Button className="white login-button" url="/login">Login</Button></div>

    </nav>
  );
};

export default Navbar;