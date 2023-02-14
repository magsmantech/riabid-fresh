import dashboardIcon from "../../assets/icons/dashboard.svg";
import artistsIcon from "../../assets/icons/artists.svg";
import artworksIcon from "../../assets/icons/artworks.svg";
import accountIcon from "../../assets/icons/account.svg";
import favoritesIcon from "../../assets/icons/favorites.svg";
import historyIcon from "../../assets/icons/history.svg";
import { Link } from "react-router-dom";
import React, { Component } from "react";

import userDark from "../../assets/icons/user-dark.svg";

const DashboardMenu = () => {
  return (
    <>
      <h3>Pages</h3>
      <Link to="/dashboard">
        <img src={dashboardIcon}></img>
        Dashboard
      </Link>

      <Link to="/dashboard/artworks">
        <img src={artworksIcon}></img>Artworks
      </Link>
      <Link to="/dashboard/account">
        <img src={accountIcon}></img>Account
      </Link>
      <Link to="/dashboard/favorites">
        <img src={favoritesIcon}></img>Favorites
      </Link>
      <Link to="/dashboard/history">
        <img src={historyIcon}></img>Order History
      </Link>

      <Link to="/dashboard/artist-bio">
        <img src={userDark}></img>Bio
      </Link>
    </>
  );
};

export default DashboardMenu;
