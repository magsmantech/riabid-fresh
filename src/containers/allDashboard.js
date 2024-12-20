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
import { getAll } from "../services/dashboardService";
import { useQuery } from "react-query";
import Loading from "./loading";
import { getJwt } from "../services/authService";
import jwt_decode from "jwt-decode";

import DashboardMenu from "../components/shared/dashboard-menu";

function AllDashboard(props) {
  const [filter, setFilter] = React.useState(false);
  var { user_id } = jwt_decode(getJwt());
  const { isLoading, error, data } = useQuery("allDashboard", getAll, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  console.log(data);
  return (
    <section id="shop" className="container">
      <div className="dashboard-container">
        <div className="flex column sidebar">
          <DashboardMenu/>
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
          </Link> */}
          {user_id == 80 ? (
            <Link to="/dashboard/allorders">
              <img src={historyIcon}></img>All Orders
            </Link>
          ) : null}
        </div>
        <div className="flex column bids">
          <h2>Order History</h2>

          {data.data.length ? (
            data.data.map((item) => (
              <div className="artworks-container">
                <div className="artworks-grid">
                  <div className="artwork-item flex title">
                    <div className="flex">
                      <img
                        src={item.image.replace(
                          "https://api.riabid.ge/storage/artworks/",
                          "https://api.riabid.ge/storage/artworks/thumbnail_"
                        )}
                      ></img>
                      <div className="flex column">
                        <p className="name">{item.title}</p>
                        <p className="country">{item.year}</p>
                      </div>
                    </div>
                    <p>{item.name}</p>
                    <p> {item.lastname}</p>
                    <p>
                      {item.angarishis_nomeri
                        ? item.angarishis_nomeri
                        : "IBAN NOT FOUND"}{" "}
                    </p>
                    <p>
                      {item.is_geo
                        ? `₾${item.buy_it_now}`
                        : `$${item.price_usd}`}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>You have got no past orders</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllDashboard;
