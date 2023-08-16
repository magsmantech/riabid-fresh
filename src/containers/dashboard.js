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

import { getJwt,logout } from "../services/authService";
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
  const [boxLength, setBoxLength] = useState([]);
  const [show, setShow] = useState(4); 

  const [updated,setUpdated] = useState(false);

  const [error, setError] = useState({});

  const editMutation = useMutation(editAddress, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      let errors = {}
      if(!variables.full_name){
        errors['full_name'] = 'The full name field is required'
      }
      if(!variables.address_1){
        errors['address_1'] = 'The address 1 field is required';
      }
      if(!variables.city){
        errors['city'] = 'The city field is required';
      }
      if(!variables.country){
        errors['country'] = 'The country field is required';
      }
      if(!variables.phone){
        errors['phone'] = 'The phone number field is required';
      }
      if(!variables.zip){
        errors['zip'] = 'The Zip field is required';
      }
      setError(errors)
    },
    onSuccess: (data, variables, context) => {
      toast.dark(data.data.success, {
        progress: undefined,
        hideProgressBar: true,
      });
      //window.location.href = "/dashboard/account";
      setError({});
      setUpdated(true);
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
            let arr = divideBoxIntoColumns(data.unsold.length,show);
            setBoxLength(arr)
      
      });
      handleResize();
      window.addEventListener('resize', handleResize)
  },[])

  useEffect(function(){
    
    const parsed = queryString.parse(props.location.search);
    console.log(parsed.tab)
    if(parsed.tab){
      handleResize();
      setCategory(null,2);
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
    if(e)
      e.preventDefault();
    setCat(category);
    console.log('cat changed')
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
                let arr = divideBoxIntoColumns(res.data.unsold.length,show);
                setBoxLength(arr)            
              }
              if(category == 2){
                setArtworkData(res.data);   
                let arr = divideBoxIntoColumns(res.data.length,show);
                setBoxLength(arr)               
              }
              if(category == 3){
                setArtworkData(res.data);            
                let arr = divideBoxIntoColumns(res.data.length,show);
                setBoxLength(arr)      
              }
              if(category == 4){
                       console.log(res.data)
                       if(res.data.addresses.length > 0){
                         setName(res.data.addresses[0].full_name)
                         setAddressOne(res.data.addresses[0].address_1)
                         setAddressTwo(res.data.addresses[0].address_2)
                         setCountry(res.data.addresses[0].country)
                         setCity(res.data.addresses[0].city)
                         setZip(res.data.addresses[0].zip)
                         setPhone(res.data.addresses[0].mobile)
                         setIban(res.data.iban)                        
                        }
              }             
            })

  }

  
  function setFavores(){
    setCategory(null,2)
    console.log('favorites changed');
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

  function divideBoxIntoColumns(boxWidth,columns) {
    const columnWidth = Math.floor(boxWidth / columns);
    const remainder = boxWidth % columns;
    return [columnWidth + (remainder > 0 ? 1 : 0), columnWidth + (remainder > 1 ? 1 : 0), columnWidth + (remainder > 2 ? 1 : 0), columnWidth];
  }

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
          <li className={cat == 1 ? "active" : ""} ><a href="/" onClick={(e)=>{setCategory(e,1)}}>my artworks</a></li>
          <li className={cat == 2 ? "active" : ""} ><a href="/" onClick={(e)=>{setCategory(e,2)}}>saved</a></li>
          <li className={cat == 3 ? "active" : ""}><a href="/" onClick={(e)=>{setCategory(e,3)}}>order history</a></li>
          <li className={cat == 4 ? "active" : ""}><a href="/" onClick={(e)=>{setCategory(e,4)}}>details</a></li>
          <li><a href="/" onClick={(e)=>{ logout();
                    window.location.href = "/"; }}>log out</a></li>
        </ul>
      </div>


      {cat != 4 && <div className='col-6 col-lg-3'>
       {cat == 1 && <div className="productBlock addArtwork ">
            
              <a href="/dashboard/addartwork">
                <div className="plus">
                <svg viewBox="0 0 110 110" fill="none">
                  <rect width="100%" height="100%" fill="none"/>
                  <path d="M54.6274 32V77.2549"  stroke-linejoin="round"/>
                  <path d="M32 54.6274H77.2548"  stroke-linejoin="round"/>
                </svg>
                <span>Add new artwork</span>
              </div>               
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
                    setFavores={setFavores}
                    />
              ) : null}

            {artworkData && boxLength.hasOwnProperty(0) && 
                <ProductBlock
                start={0}
                limit={boxLength[0]}
                data={artworkData}
                edit={cat == 1 ? true : false}
                favorite={cat==2 ? true : false}
                setFavores={setFavores}
                />
             }

      </div>}

      
      {cat != 4  && <div className='col-6 col-lg-3'>
           
              {artworkData && boxLength.hasOwnProperty(1) ? (
                    <ProductBlock
                    start={boxLength[0]}
                    limit={boxLength[1]}
                    data={artworkData}
                    edit={cat == 1 ? true : false}
                    setFavores={setFavores}
                    />
              ) : null}


      </div>}

         
      {cat != 4 && <div className='col-6 col-lg-3 hideLg'>
            
              {artworkData && boxLength.hasOwnProperty(2) ? (
                    <ProductBlock
                    start={boxLength[1]+boxLength[0]}
                    limit={boxLength[2]}
                    data={artworkData}
                    edit={cat == 1 ? true : false}
                    setFavores={setFavores}
                    />
              ) : null}

      </div>}

      {cat != 4 && <div className='col-6 col-lg-3 hideLg'>
         
              {artworkData && boxLength.hasOwnProperty(3)  ? (
                    <ProductBlock
                    start={boxLength[1]+boxLength[0] +boxLength[2]}
                    limit={boxLength[3]}
                    data={artworkData}
                    edit={cat == 1 ? true : false}
                    setFavores={setFavores}
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
            {error.full_name && <span class='red error'>{error.full_name}</span>}
            <input
              value={address_1}
              onChange={(e) => setAddressOne(e.target.value)}
              type="text"
              name="address_one"
              placeholder={"Address Line 1"}
            ></input>
            {error.address_1 && <span class='red error'>{error.address_1}</span>}
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
            {error.country && <span class='red error'>{error.country}</span>}
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              name="city"
              placeholder={"City"}
            ></input>
            {error.city && <span class='red error'>{error.city}</span>}
            <input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              type="text"
              name="zip"
              placeholder={"Zip/Postal Code"}
            ></input>
            {error.zip && <span class='red error'>{error.zip}</span>}
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              name="phone"
              placeholder={"Phone Number"}
            ></input>
            {error.phone && <span class='red error'>{error.phone}</span>}
            <input
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              type="text"
              name="iban"
              placeholder={"IBAN number"}
            ></input>

           
        
                    </div>
                    <input
                    className={updated ? "updateAddress active" : "updateAddress"}
              type="submit"
              value={updated ? "UPDATED" : "UPDATE INFO"}
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
