import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cardImg from "../assets/dummy/bid.png";
import dashboardIcon from "../assets/icons/dashboard.svg";
import artistsIcon from "../assets/icons/artists.svg";
import artworksIcon from "../assets/icons/artworks.svg";
import accountIcon from "../assets/icons/account.svg";
import favoritesIcon from "../assets/icons/favorites.svg";
import historyIcon from "../assets/icons/history.svg";
import plus from "../assets/icons/plus.svg";
import { editAddress, getAddress } from "../services/dashboardService";
import { useMutation, useQuery } from "react-query";
import Loading from "./loading";
import { toast } from "react-toastify";
import DashboardMenu from "../components/shared/dashboard-menu";

function AddAddress(props) {
  const [title, setName] = useState("");
  const [address_1, setAddressOne] = useState("");
  const [address_2, setAddressTwo] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const editMutation = useMutation(editAddress, {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      full_name: title,
      address_1,
      address_2,
      country,
      city,
      zip,
      mobile: phone,
    };
    editMutation.mutate(data);
  };

  return (
    <section id="shop" className="container">
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
        </div>
        <div className="flex column  contact-container dashboard">
          <h2 style={{ marginBottom: "1vw" }}>Address</h2>
          <form onSubmit={handleSubmit} className="contact-form dashboard">
            <input
              value={title}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="full_name"
              placeholder={"Full Name"}
            ></input>
            <input
              value={address_1}
              onChange={(e) => setAddressOne(e.target.value)}
              type="text"
              name="address_one"
              placeholder={"Address Line 1"}
            ></input>
            <input
              value={address_2}
              onChange={(e) => setAddressTwo(e.target.value)}
              type="text"
              name="address_two"
              placeholder={"Address Line 2"}
            ></input>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              name="country"
              placeholder={"Country"}
            ></input>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              name="city"
              placeholder={"City"}
            ></input>
            <input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              type="text"
              name="zip"
              placeholder={"Zip/Postal Code"}
            ></input>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              name="phone"
              placeholder={"Phone Number"}
            ></input>

            <input
              style={{ cursor: "pointer" }}
              type="submit"
              value="Add Address"
            ></input>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddAddress;
