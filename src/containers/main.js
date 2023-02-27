import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.scss';
import React, { useEffect, useState} from "react";
import Hero from "../components/main/Hero";
import ProductGrid from "../components/shared/ProductGrid";
import SharedSlider from "../components/shared/SharedSlider";

import { getAuctions } from "../services/auctionsService";
import { QueryClient, useQuery,useMutation } from "react-query";
import { getDashboard, getPress } from "../services/dashboardService";
import {
  getCollections,
} from "../services/collectionService";
import Loading from "./loading";
import { Link } from "react-router-dom";
import { MetaTags } from "react-meta-tags";
import Slider from "react-slick";
import ReactTooltip from 'react-tooltip';
import CardItem from '../components/shared/CardItem';
import CardItemPdf from '../components/shared/CardItemPdf';
import organisationFirst from "../assets/images/organizations-1.png";
import organisationSecond from "../assets/images/organizations-2.png";
import pdf from "../assets/pdf/BID_CATALOGUE.pdf"
import { toast } from "react-toastify";
import {
  addBag,
  addComment,
  addFavorites,
  requestPrice,
} from "../services/bagService";
import {
  FaCheck,
  FaShippingFast,
  FaCertificate,
  FaRocketchat,
} from "react-icons/fa";


const queryClient = new QueryClient();

function Main() {
  console.log("main mounted")
  const collectionsResult = useQuery("collections", getCollections, {
    refetchOnWindowFocus: false,
  });
    const collectionData = collectionsResult.data
    ? collectionsResult.data.data
    : [];

    const pressSliderSettings = {
      dots: false,
      infinite: true,
      draggable:true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      accessibility: true,
      className: "press-slide",
    };
    const pressResult = useQuery("press", getPress, {
      refetchOnWindowFocus: false,
    });
    const pressData = pressResult.data ? pressResult.data.data : [];

   return (
    <section>
       <MetaTags>
        <title>
          Buy, Sell, and Research Contemporary Georgian Art Online: RiaBid
        </title>
        <meta
          name="keywords"
          content="contemporary, art, georgian, georgian arts, design, contemporary, modern,fine art,auctions,artists,georgian artists,online auctions,prints,artworks,buy art,photographs,buy art,artwork for sale,decorative art,Artwork made by the contemporary artists in the GeorgiansGeorgia contemporary art,art from georgia,Georgia's Contemporary Artists,contemporary artists from Georgia,Georgian artist works prices,where i cen see georgian artists?,"
        />

        <meta
          name="description"
          content="RiaBid is the art auctions online. Find artworks for sale, online auctions for contemporary art, top galleries, leading Georgian artists."
        />
      </MetaTags>
      <Hero />
      <div className="content">
        <ProductGrid />
      </div>
      <div className='special_projects'>
      {collectionData.length ? (
        <SharedSlider
          slidesToShow={3}
          data={collectionData}
          title="special projects"
          buttonDisabled
          special
        />
      ) :''}
      </div>
        
      <div className="selectedFor logos">
 
        <Slider {...pressSliderSettings}>
          {pressData
            ? pressData.map((e,i) => (
                <a href={e.press_link} target="_blank" key={i}>
                  <img
                  
                  src={e.image_link}
                    
                   />
                </a>
              ))
            : null}
        </Slider>
      </div>
    </section>
  );
}

export default Main;
