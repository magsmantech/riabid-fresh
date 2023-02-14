import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ll from "../../assets/logo-light.svg";
import ld from "../../assets/logo-def.svg";
import plus from "../../assets/icons/plus.svg";
import pluspride from "../../assets/pluspride.svg";

import ln from "../../assets/logo-new.svg";
import ria from "../../assets/riabid.svg";
import arrow from "../../assets/icons/arrow-down.svg";
import arrowbl from "../../assets/icons/arrow-black.svg";
import search from "../../assets/icons/search.svg";
import searchDark from "../../assets/icons/search-dark.svg";
import frameIcon from "../../assets/icons/frame.svg";
import cart from "../../assets/cart-light.svg";
import cartDark from "../../assets/icons/cart-dark.svg";
import user from "../../assets/icons/user.svg";
import userDark from "../../assets/icons/user-dark.svg";
import favorites from "../../assets/icons/favorites.svg";
import hamburgerDark from "../../assets/icons/hamburger-dark.svg";
import { userProvider } from "../../store/store";

import Modal from "./modal";
import { logout } from "../../services/authService";

function Navbar() {


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      window.location.href ='/search?search=' + searchTerm;
    }
   }
   

  const redirect = (e) => {
 
      window.location.href ='/search?search=' + searchTerm;
    
   }

  const { currentUser } = userProvider();
  const [navActive, setNavActive] = useState(false);
  const [authActive, setAuthActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [vW, setVW] = useState(0);
  const [authModalActive, setAuthModalActive] = useState({
    login: false,
    register: false,
  });

  const pathName = useLocation().pathname || null;
  React.useEffect(() => {
    setVW(window.innerWidth);
    window.addEventListener("resize", () => {
      setVW(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setVW(window.innerWidth);
      });
    };
  }, []);

  const searchRef = useRef(null);
 
  return (   

    <nav class="navbar navbar-expand-lg">
    <Link className="logo-container navbar-brand" href="/">
          <img className="logo" src={ln} alt="logo" />
    </Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto"> 
      <li className="nav-item">
                <NavLink
                className="nav-link"
                  to={`/artists`}
                  activeClassName="active-item"
                  style={{
                    color: pathName == "/artists" ? "#fbb03b " : "black",
                  }}
                >
                  ARTISTS
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                className="nav-link"
                  to={`/store`}
                  activeClassName="active-item"
                  style={{
                    color: pathName == "/store" ? "#fbb03b " : "black",
                  }}
                >
                  ARTWORKS
                </NavLink>
              </li>            
              <li className="nav-item">
                <NavLink
                className="nav-link"
                  to={`/galleries`}
                  activeClassName="active-item"
                  style={{
                    color: pathName == "/galleries" ? "#fbb03b " : "black",
                  }}
                >
                  GALLERIES
                </NavLink>
              </li>   
    </ul>
  </div>
  <div className="ml-auto">
  <Link to="#">
            <img
              className="searchIcon"
              src={searchDark}
              alt="search-btn"
            />
          </Link>
          <Link  to="#" >
            <img
              className="cart-btn frameIcon"
              src={frameIcon}
              alt="search-btn"
            />
          </Link>
          <Link to="/cart">
              <img className="cart-btn" src={cartDark} alt="search-btn" />
            </Link>

            <Link to="#" onClick={() => setAuthActive(!authActive)}>
              <img className="user-btn" src={userDark} alt="user-btn" />
            </Link>
  </div>
</nav>

  );
}

export default Navbar;
