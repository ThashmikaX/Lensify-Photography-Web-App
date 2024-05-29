import { useState } from "react";
import "./Navbar.css";
import * as React from 'react';
import Button from "./Button";
import { Link } from 'react-scroll';
import ProfileComponent from '../components/ProfileComponent'
import { useAuth } from '../auth/Auth';

const Navbar = ({ links }) => {
  const { auth } = useAuth();

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
          <li
          className="uil uil-times navCloseBtn"
          onClick={handleNavCloseClick}
        >close</li>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.to} smooth={true}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="login">
        {!auth && <Button className="white login-button" url="/login">Login or Register</Button>}
        {auth && <ProfileComponent Name='false'></ProfileComponent> }
      </div>
      

    </nav>
  );
};

export default Navbar;