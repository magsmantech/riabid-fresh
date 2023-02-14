import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.scss';
import React, { useEffect, useState} from "react";
import Hero from "../components/main/Hero";
import Banners from "../components/main/Banners";
import SharedSlider from "../components/shared/SharedSlider";
import ProductBlock from "../components/shared/ProductBlock";
import AuctionSlider from "../components/shared/AuctionSlider";
import { getAuctions } from "../services/auctionsService";
import Subscribe from "../components/shared/Subscribe";
import { QueryClient, QueryClientProvider, useQuery,useMutation } from "react-query";
import { getDashboard, getPress } from "../services/dashboardService";

import {
  getArtworksWithCollection,
  getCollections,
} from "../services/collectionService";
import Loading from "./loading";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "../json.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const favoritesMutation = useMutation(addFavorites, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error("You need to login");
    },
    onSuccess: (data, variables, context) => {
      toast.dark("Artwork added to favorites", {
        progress: undefined,
        hideProgressBar: true,
      });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const { isLoading, error, data } = useQuery("dashboard", getDashboard, {
    refetchOnWindowFocus: false,
  });

  const curators = data ? data.data.curators : [];
  const auc_data = useQuery("auctions", getAuctions, {
    refetchOnWindowFocus: false,
  });


  const collectionsResult = useQuery("collections", getCollections, {
    refetchOnWindowFocus: false,
  });

  const pressResult = useQuery("press", getPress, {
    refetchOnWindowFocus: false,
  });
  const pressData = pressResult.data ? pressResult.data.data : [];
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

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  const {
    selected_just_for_you,
    auctions,
    trending,
    pride,
    photography,
    special
  } = data.data;

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
      <div className="row">
        <div class='col-4'>
          <ul className="trendMenu">
            <li><Link href="#">trending</Link></li>
            <li><Link href="#">featured</Link></li>
          </ul>

          {photography.length ? (
        <ProductBlock
          slidesToShow={0}
          data={photography}
        />
      ) : null}
        </div>
        <div className='col-4'>
          <ul className="trendMenu fullWidth">
            <li class='active'><Link href="#">curators <span>choice made by <span classname='author'>Guram Tsibakhashvili</span></span></Link></li>
          </ul>

          {trending.length ? (
            <ProductBlock
              data={trending}
            />
          ) : null}
        </div>
        <div className='col-4'>
        <ul className="trendMenu fullWidth">
         
        </ul>
        {selected_just_for_you.length ? (
            <ProductBlock
              data={selected_just_for_you}
            />
          ) : null}
        </div>
      </div>

  <div className="row productPaginate">
    <div className='col-4 prevPage'>
          <Link href="#">PREV</Link>
    </div>
    <div className='col-4 centerPage'>
    <Link href="#">ALL ARTWORKS</Link>
      </div>
      <div className='col-4 nextPage'>
      <Link href="#">NEXT</Link>
      </div>
  </div>


  <div className="row">
        <div class='col-12'>
          <ul className="trendMenu allMenu">
            <li className='active'><Link href="#">all art</Link></li>
            <li><Link href="#">paintings</Link></li>
            <li><Link href="#">graphics</Link></li>
            <li><Link href="#">print</Link></li>
            <li><Link href="#">sculpture</Link></li>
            <li><Link href="#">ceramics</Link></li>
            <li><Link href="#">photography</Link></li>
          </ul>
        </div>
      <div className='col-3'>
          {photography.length ? (
        <ProductBlock
          slidesToShow={0}
          data={photography}
        />
      ) : null}
        </div>
        <div className='col-3'>
       

          {trending.length ? (
            <ProductBlock
              data={trending}
            />
          ) : null}
        </div>
        <div className='col-3'>
     
        {selected_just_for_you.length ? (
            <ProductBlock
              data={selected_just_for_you}
            />
          ) : null}
        </div>
        <div className='col-3'>
    
        {special.length ? (
            <ProductBlock
              data={special}
            />
          ) : null}
        </div>
      </div>


  <div className="row productPaginate">
    <div className='col-4 prevPage'>
          <Link href="#">PREV</Link>
    </div>
    <div className='col-4 centerPage'>
    <Link href="#">ALL ARTWORKS</Link>
      </div>
      <div className='col-4 nextPage'>
      <Link href="#">NEXT</Link>
      </div>
  </div>

</div>

      


      

      {/* <div style={{ height: "500px" }}></div> */}
      <div class='special_projects'>
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
            ? pressData.map((e) => (
                <a href={e.press_link} target="_blank">
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
