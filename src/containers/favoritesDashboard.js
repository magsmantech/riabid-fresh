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
import { useQuery, useQueryClient,useMutation } from "react-query";

import Loading from "./loading";
import { getFavorites } from "../services/dashboardService";
import { getJwt } from "../services/authService";
import jwt_decode from "jwt-decode";
import { MetaTags } from "react-meta-tags";
import DashboardMenu from "../components/shared/dashboard-menu";
import {
  addBag,
  addComment,
  addFavorites,
  requestPrice,
} from "../services/bagService";
import { toast } from "react-toastify";
function FavoritesDashboard(props) {
  const [filter, setFilter] = React.useState(false);
  const queryClient = useQueryClient();
  var { user_id } = jwt_decode(getJwt());
  const { isLoading, error, data } = useQuery("favorites", getFavorites, {
    refetchOnWindowFocus: false,
  });

  const favoritesMutation = useMutation(addFavorites, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error("You need to login");
    },
    onSuccess: (data, variables, context) => {
      toast.dark("Artwork Removed to favorites", {
        progress: undefined,
        hideProgressBar: true,
      });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  return (
    <section id="shop" className="container">
      <MetaTags>
        <title>Saved Artworks - RiaBid</title>
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
          <section className=" auctions">
            <div className="grid-container-auctions">
              {data.data.map((item) => (
                <div key={item.id} className="product flex column">
                  <Link to={"/store/" + item.artwork_id}>
                    <div className="img">
                      <img
                        src={item.image.replace(
                          "https://api.riabid.ge/storage/artworks/",
                          "https://api.riabid.ge/storage/artworks/thumbnail_"
                        )}
                      ></img>
                    </div>

                    <p className="title">
                      <i>{item.title}</i>
                    </p>
                    <p className="title2">{item.display_name}</p>
                  </Link>
                  <div className="flex space-between">
                    <div className="flex">
                      <p className="price">
                        {item.is_geo
                          ? `₾${item.buy_it_now}`
                          : `$${item.price_usd}`}
                      </p>
                    </div>

                    <button class="main-button many removeFavorite" onClick={() => favoritesMutation.mutate(item.id)}>Delete</button>

                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default FavoritesDashboard;
