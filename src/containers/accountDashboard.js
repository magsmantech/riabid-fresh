import React, { useState } from "react";
import { Link } from "react-router-dom";
import cardImg from "../assets/dummy/bid.png";
import dashboardIcon from "../assets/icons/dashboard.svg";
import artistsIcon from "../assets/icons/artists.svg";
import artworksIcon from "../assets/icons/artworks.svg";
import accountIcon from "../assets/icons/account.svg";
import favoritesIcon from "../assets/icons/favorites.svg";
import historyIcon from "../assets/icons/history.svg";
import plus from "../assets/icons/plus.svg";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addIBAN,
  deleteAddress,
  getAddress,
  getArtworks,
  requestAuction,
} from "../services/dashboardService";
import Loading from "./loading";
import { toast } from "react-toastify";
import { getJwt } from "../services/authService";
import jwt_decode from "jwt-decode";
import { MetaTags } from "react-meta-tags";
import DashboardMenu from "../components/shared/dashboard-menu";

function AccountDashboard(props) {
  const [filter, setFilter] = useState(false);
  const queryClient = useQueryClient();
  const [IBAN, setIBAN] = useState("");
  const addIBANMutation = useMutation(addIBAN, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.context);
    },
    onSuccess: (data, variables, context) => {
      toast.dark(data.data.success, {
        progress: undefined,
        hideProgressBar: true,
      });
      window.location.href = "/dashboard/account";
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const deleteMutation = useMutation(deleteAddress, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.context);
    },
    onSuccess: (data, variables, context) => {
      toast.dark(data.data, {
        progress: undefined,
        hideProgressBar: true,
      });
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries("addresses");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      angarishis_nomeri: IBAN,
    };
    addIBANMutation.mutate(data);
  };
  var { user_id } = jwt_decode(getJwt());

  const { isLoading, error, data } = useQuery("addresses", getAddress, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  return (
    <section id="shop" className="container">
      <MetaTags>
        <title>Settings - RiaBid</title>
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
          </Link>

          <Link to="/dashboard/artist-bio">
            <img src={historyIcon}></img>Bio
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
              <Link to="/dashboard/addaddress" className="add">
                <img src={plus}></img>Add Address
              </Link>
            </div>
            {data.data.iban ? (
              <div className="artworks-grid">
                <div className="artwork-item flex title">
                  <div className="flex">
                    <p>{data.data.iban}</p>
                  </div>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={() =>
                        addIBANMutation.mutate({ angarishis_nomeri: "" })
                      }
                      className="main-button"
                    >
                      Delete
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex column  contact-container dashboard">
                <form
                  onSubmit={handleSubmit}
                  className="contact-form dashboard"
                >
                  <input
                    value={IBAN || data.data.iban}
                    onChange={(e) => setIBAN(e.target.value)}
                    type="text"
                    name="full_name"
                    placeholder={"IBAN number"}
                  ></input>

                  <input
                    style={{ cursor: "pointer" }}
                    type="submit"
                    value="SAVE IBAN"
                  ></input>
                </form>
              </div>
            )}

            <div className="artworks-grid">
              {data.data.addresses.length
                ? data.data.addresses.map((item) => (
                    <div className="artwork-item flex title">
                      <div className="flex">
                        <p>{item.full_name}</p>
                      </div>
                      <p>{item.address_1}</p>
                      <p>{item.address_2}</p>
                      <p>{item.mobile}</p>
                      <p
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button
                          onClick={() => deleteMutation.mutate(item.id)}
                          className="main-button"
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  ))
                : "You haven't got any addresses"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountDashboard;
