import React from "react";
import { Link } from "react-router-dom";
import cardImg from "../assets/dummy/bid.png";
import dashboardIcon from "../assets/icons/dashboard.svg";
import artistsIcon from "../assets/icons/artists.svg";
import artworksIcon from "../assets/icons/artworks.svg";
import accountIcon from "../assets/icons/account.svg";
import favoritesIcon from "../assets/icons/favorites.svg";
import historyIcon from "../assets/icons/history.svg";
import plus from "../assets/icons/plus.svg";
import { useQuery, useQueryClient } from "react-query";
import { getBidHistory } from "../services/dashboardService";
import Loading from "./loading";
import { getJwt } from "../services/authService";
import jwt_decode from "jwt-decode";
import DashboardMenu from "../components/shared/dashboard-menu";

import { FaStar } from 'react-icons/fa';
import { MetaTags } from "react-meta-tags";
function Dashboard(props) {
  const [filter, setFilter] = React.useState(false);
  const queryClient = useQueryClient();
  var { user_id } = jwt_decode(getJwt());
  const { isLoading, error, data } = useQuery("bidshistory", getBidHistory, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section id="shop" className="container">
      <MetaTags>
        <title>Bid History - RiaBid</title>
        <meta name="description" content="User space on Riabid.ge" />
        <meta
          name="keywords"
          content="contemporary, art, georgian, georgian arts, design, contemporary, modern,fine art,auctions,artists,georgian artists,online auctions,prints,artworks,buy art,photographs,buy art,artwork for sale,decorative art,Artwork made by the contemporary artists in the GeorgiansGeorgia contemporary art,art from georgia,Georgia's Contemporary Artists,contemporary artists from Georgia,Georgian artist works prices,where i cen see georgian artists?,"
        />
      </MetaTags>
      <div className="dashboard-container">
        <div className="flex column sidebar">
          {/* <h3>Pages</h3>
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
            <img src={historyIcon}></img>Bio
          </Link> */}

          <DashboardMenu/>
          {user_id == 80 ? (
            <Link to="/dashboard/allorders">
              <img src={historyIcon}></img>All Orders
            </Link>
          ) : null}
        </div>
        <div className="flex column bids">
          <h2>MY BIDS</h2>
          {data.data.map((item) => (
            <Link to={"/store/" + item.artwork_id}>
              <div className="bid-card">
                <div className="flex space-between">
                  <div className="flex" style={{position: "relative"}}>
                    <img
                      src={item.image.replace(
                        "https://api.riabid.ge/storage/artworks/",
                        "https://api.riabid.ge/storage/artworks/thumbnail_"
                      )}
                    ></img>
                    <FaStar size="12px" style={{position: "absolute"}}/>
                    <div classname="flex column">
                      <p className="name">{item.title}</p>
                      <p className="country">
                        Current Bid: {item.current_bid} ₾
                      </p>
                    </div>
                  </div>
                  <Link
                    style={{ alignSelf: "center" }}
                    to={"/store/" + item.artwork_id}
                    className="main-button"
                  >
                    Full View
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
