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

import DashboardMenu from "../components/shared/dashboard-menu";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteArtwork,
  getArtworks,
  requestAuction,
} from "../services/dashboardService";
import Loading from "./loading";
import { toast } from "react-toastify";
import { getJwt } from "../services/authService";
import jwt_decode from "jwt-decode";
import { MetaTags } from "react-meta-tags";
function ArtworksDashboard(props) {
  const [filter, setFilter] = React.useState(false);
  const queryClient = useQueryClient();

  const requestMutation = useMutation(requestAuction, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.context);
    },
    onSuccess: (data, variables, context) => {
      toast.dark("You successfully requested auction", {
        progress: undefined,
        hideProgressBar: true,
      });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const deleteMutation = useMutation(deleteArtwork, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.context);
    },
    onSuccess: (data, variables, context) => {
      toast.dark("You successfully deleted artwork", {
        progress: undefined,
        hideProgressBar: true,
      });
      queryClient.invalidateQueries("artworksDashboard");
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
  var { user_id } = jwt_decode(getJwt());
  const { isLoading, error, data } = useQuery(
    "artworksDashboard",
    getArtworks,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  return (
    <section id="shop" className="container">
      <MetaTags>
        <title>Artwork & Artist home - RiaBid</title>
        <meta name="description" content="User space on Riabid.ge" />
        <meta
          name="keywords"
          content="contemporary, art, georgian, georgian arts, design, contemporary, modern,fine art,auctions,artists,georgian artists,online auctions,prints,artworks,buy art,photographs,buy art,artwork for sale,decorative art,Artwork made by the contemporary artists in the GeorgiansGeorgia contemporary art,art from georgia,Georgia's Contemporary Artists,contemporary artists from Georgia,Georgian artist works prices,where i cen see georgian artists?,"
        />
      </MetaTags>
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
          <div className="artworks-container">
            <div className="flex space-between">
              <Link to="/dashboard/addartwork" className="add">
                <img src={plus}></img>Add Artwork
              </Link>

              <Link to="/dashboard/addartist" className="add">
                <img src={plus}></img>Add Artist
              </Link>
            </div>
            <div className="artworks-grid">
              {data.data.unsold.length
                ? data.data.unsold.map((item) => (
                    <div className="artwork-item flex title">
                      <div className="flex">
                        <img src={item.image}></img>
                        <div className="flex column">
                          <p className="name">{item.title}</p>
                          <p className="country">{item.location}</p>
                          <p class="price">
                            {item.is_geo
                              ? `₾${item.buy_it_now}`
                              : `$${item.price_usd}`}
                          </p>
                        </div>
                      </div>
                      <p></p>
                      <p class="hide">For Sale</p>
                      <p class="hide">Exact Price</p>
                      <div class="right flex column">
                        {" "}
                        <Link
                          to={"/dashboard/editartwork/" + item.id}
                          className="main-button many"
                        >
                          Edit Artwork
                        </Link>
                        <button
                          onClick={() => deleteMutation.mutate(item.id)}
                          className="main-button many"
                        >
                          Delete Artwork
                        </button>
                        <button
                          onClick={() => requestMutation.mutate(item.id)}
                          className="main-button many"
                        >
                          Request Auction
                        </button>
                      </div>
                    </div>
                  ))
                : "You haven't got any artworks"}
            </div>
            {data.data.sold.length ? (
              <div>
                <h2>Sold artworks</h2>
                <div className="artworks-grid">
                  {data.data.sold.map((item) => (
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
                          <p className="country">{item.location}</p>
                        </div>
                        <p class="price">
                          {item.is_geo
                            ? `₾${item.buy_it_now}`
                            : `$${item.price_usd}`}
                        </p>
                      </div>

                      <p class="hide">SOLD</p>
                      <p class="hide">Exact Price</p>
                      <Link
                        style={{ textAlign: "center" }}
                        to="/"
                        className="main-button"
                      >
                        Order Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
}

export default ArtworksDashboard;
