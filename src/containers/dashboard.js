import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cardImg from "../assets/dummy/bid.png";
import dashboardIcon from "../assets/icons/dashboard.svg";
import artistsIcon from "../assets/icons/artists.svg";
import artworksIcon from "../assets/icons/artworks.svg";
import accountIcon from "../assets/icons/account.svg";
import favoritesIcon from "../assets/icons/favorites.svg";
import historyIcon from "../assets/icons/history.svg";
import plus from "../assets/icons/plus.svg";
import addArtwork from "../assets/icons/addArtwork.svg";
import DashboardHeader from "../components/dashboardHeader";
import { useQuery, useMutation,useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getBidHistory } from "../services/dashboardService";

import { getJwt } from "../services/authService";
import jwt_decode from "jwt-decode";
import DashboardMenu from "../components/shared/dashboard-menu";

import ProductBlock from "../components/shared/ProductBlock";
import axios from '../lib/axios';
import {
  deleteArtwork,
  getArtworks,
  requestAuction,
} from "../services/dashboardService";
import { FaStar } from 'react-icons/fa';
import { MetaTags } from "react-meta-tags";
import { editAddress, getAddress } from "../services/dashboardService";

function Dashboard(props) {
  const [filter, setFilter] = React.useState(false);
  const queryClient = useQueryClient();
  var { user_id } = jwt_decode(getJwt());
  const [limitColumn, setLimitColumn] = useState(3);
  const [limitRow, setLimitRow] = useState(4);

  const [artworkData, setArtworkData] = useState([]);
  const [cat, setCat] = useState(1);

  const [title, setName] = useState("");
  const [address_1, setAddressOne] = useState("");
  const [address_2, setAddressTwo] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [iban, setIban] = useState("");

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
  const queryString = require('query-string');

  useEffect(function(){
   
    axios.get('artworks/my-artworks')
      .then((res) => {
            let data = res.data;
            setArtworkData(data.unsold);
      
      });
      handleResize();
      window.addEventListener('resize', handleResize)
  },[])

  useEffect(function(){
    const parsed = queryString.parse(props.location.search);
    if(parsed.tab){
      setCat(4);
    }
  },[props.location.search])


  function handleResize() {
    if(window.innerWidth > 991){
      setLimitRow(4);
    }
    else {
      setLimitRow(2);
    }
 
  }
  function setCategory(e,category){
    e.preventDefault();
    setCat(category);
    
    let url = 'artworks/my-artworks';
    if(category == 1){
      url = 'artworks/my-artworks';
    }
    if(category == 2){
      url = 'favorites';
    }
    if(category == 3){
      url = 'myorders';
    }
    if(category == 4){
      url = 'myaddresses';
    }

    axios.get(url)
            .then((res) => {
              if(category == 1){
                setArtworkData(res.data.unsold);                 
              }
              if(category == 2){
                setArtworkData(res.data);                  
              }
              if(category == 3){
                setArtworkData(res.data);                  
              }
              if(category == 4){
                setArtworkData(res.data);                 
              }             
            })

  }

  const handleSubmitDetails = (e) => {
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
    <section className="paddingLeft">
      <MetaTags>
        <title>Bid History - RiaBid</title>
        <meta name="description" content="User space on Riabid.ge" />
        <meta
          name="keywords"
          content="contemporary, art, georgian, georgian arts, design, contemporary, modern,fine art,auctions,artists,georgian artists,online auctions,prints,artworks,buy art,photographs,buy art,artwork for sale,decorative art,Artwork made by the contemporary artists in the GeorgiansGeorgia contemporary art,art from georgia,Georgia's Contemporary Artists,contemporary artists from Georgia,Georgian artist works prices,where i cen see georgian artists?,"
        />
      </MetaTags>

    <DashboardHeader />


    <div className="row">
      <div className='col-12'>
        <ul class="trendMenu allMenu inProfile">
          <li className={cat == 1 ? "active" : ""} ><a href="/" onClick={(e)=>{setCategory(e,1)}}>artworks</a></li>
          <li className={cat == 2 ? "active" : ""} ><a href="/" onClick={(e)=>{setCategory(e,2)}}>favorites</a></li>
          <li className={cat == 3 ? "active" : ""}><a href="/" onClick={(e)=>{setCategory(e,3)}}>order history</a></li>
          <li className={cat == 4 ? "active" : ""}><a href="/" onClick={(e)=>{setCategory(e,4)}}>details</a></li>
        </ul>
      </div>


      {cat != 4 && <div className='col-6 col-lg-3'>
       {cat == 1 && <div className="productBlock addArtwork square">
            
              <a href="/dashboard/addartwork">
                <img src={addArtwork} />
                <span>Add new artwork</span>
              </a>
              </div>
            }
              {artworkData ? (
                    <ProductBlock
                    start={0}
                    limit={limitRow == 2 ? artworkData.length / 2 : artworkData.length / 4}
                    data={artworkData}
                    edit={cat == 1 ? true : false}
                    favorite={cat==2 ? true : false}
                    />
              ) : null}

      </div>}

      
      {cat != 4  && <div className='col-6 col-lg-3'>
           
              {artworkData ? (
                    <ProductBlock
                    start={limitRow == 2 ? artworkData.length / 2 : artworkData.length / 4}
                    limit={limitRow == 2 ? artworkData.length / 2 : artworkData.length / 4}
                    data={artworkData}
                    edit={cat == 1 ? true : false}
                    />
              ) : null}
      </div>}

         
      {cat != 4 && <div className='col-6 col-lg-3 hideLg'>
            
              {artworkData ? (
                    <ProductBlock
                    start={limitRow == 2 ? 2*(artworkData.length / 2) : 2*(artworkData.length / 4)}
                    limit={limitRow == 2 ? artworkData.length / 2 : artworkData.length / 4}
                    data={artworkData}
                    edit={cat == 1 ? true : false}
                    />
              ) : null}

      </div>}

      {cat != 4 && <div className='col-6 col-lg-3 hideLg'>
         
              {artworkData ? (
                    <ProductBlock
                    start={limitRow == 2 ? 3*(artworkData.length / 2) : 3*(artworkData.length / 4)}
                    limit={limitRow == 2 ? artworkData.length / 2 : artworkData.length / 4}
                    data={artworkData}
                    edit={cat == 1 ? true : false}
                    />
              ) : null}

      </div>}

                
            {cat == 4 && <div className="details">

              <div className='row'>
                <div className='col-md-5'>
                  <div className="deliveryDetails">
                      <h1>delivery details</h1>
                  </div>
                  </div>
                  <div className="col-md-7">
                  <form onSubmit={handleSubmitDetails} className="contact-form dashboard">
                  <div className="form">
                  
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
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              type="text"
              name="iban"
              placeholder={"IBAN number"}
            ></input>

           
        
                    </div>
                    <input
                    className="updateAddress"
              type="submit"
              value="UPDATE INFO"
            ></input>
                    </form>
                  </div>
           
              </div>
                  
              </div>}
      </div>

    </section>
  );
}

export default Dashboard;
