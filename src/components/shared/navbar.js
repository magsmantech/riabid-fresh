import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ln from "../../assets/logo-new.svg";
import searchDark from "../../assets/icons/search-dark.svg";
import frameIcon from "../../assets/icons/frame.svg";
import chat from "../../assets/icons/chat.svg";
import { userProvider } from "../../store/store";
import { logout } from "../../services/authService";
function Navbar() {

  console.log('navbar mounted');
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
  const searchRef = useRef(null);
 
  return (   
    <>
    <nav className="navbar navbar-expand-lg">
    <Link className="logo-container navbar-brand" to="/">
          <img className="logo" src={ln} alt="logo" />
    </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto"> 
      <li className="nav-item">
                <NavLink
                className="nav-link"
                  to={`/artists`}
                  activeClassName="active-item"
                  // style={{
                  //   color: pathName == "/artists" ? "#fbb03b " : "black",
                  // }}
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
              className="frameIcon"
              src={frameIcon}
              alt="search-btn"
            />
          </Link>
          <Link to="/cart">
              <span className='cart-btn'></span>
            </Link>

            <Link to="#" onClick={() => setAuthActive(!authActive)}>
              <span className='user-btn'></span>
            </Link>
  </div>
</nav>
<img
              className="chatIcon"
              src={chat}
              alt="chat-btn"
            />
</>
  );
}

export default Navbar;
