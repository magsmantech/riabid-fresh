import React, { useRef, useState } from "react";

import {
  getArtworks,
  getArtworksNew,
  getArtworksRecomended,
} from "../services/artworksService";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "./loading";
import sold from "../assets/sold.png";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import RangeSlider from "../components/shared/RangeSlider";
import ScrollToTopOnMount from "../components/shared/ScrollToTop";
import Pagination from "./Pagination";
import { FaStar } from "react-icons/fa";
import { getCurator } from "../services/curatorService";
import { MetaTags } from "react-meta-tags";
import Slider from "react-slick";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

function Curator(props) {

  const sliderRef = useRef();
  const [activeItem, setActiveItem] = useState(0);
  const [prevItem, setPrevItem] = useState(0);
  const [dragging,setDragging] = useState(false);
  const { isLoading, error, data } = useQuery(
    "curator" + props.match.params.id,
    () => getCurator(props.match.params.id),
    {
      refetchOnWindowFocus: false,
    }
  );
  const curator = data ? data.data.data : [];



  var settings = {
    draggable:true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,

    beforeChange: (current, next) => {
      setDragging(true);   
      
      setActiveItem(next);    
    },
    afterChange:()=>{
      setDragging(false);   
    },
 
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 590,
        settings: {
          slidesToShow:1,
          slidesToScroll: 1,
        },
      }
    ],
  };




  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  return (
    
        curator ? (
    <section className="container curator_page">

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
        
        <h1 class='curators_choice'>CURATOR’S CHOICE</h1>
        {/* <img src={`${curator.curator.curator_biography.image}`} /> */}

       <div class='text' dangerouslySetInnerHTML={{__html: curator.curator.curator_biography.curator_biography}} />
        <div className="selectedFor">
          <div className="head-wrapper">
        <div className="action-wrapper">
       <div className="arrow-wrapper">
            <div
              className={
                activeItem === 0 ? "left-arrow arrow-disabled" : "left-arrow"
              }
              onClick={() => sliderRef.current.slickPrev()}
            >
              <BsArrowLeftShort />
            </div>
            <div
              className="right-arrow"
              onClick={() => {
                sliderRef.current.slickNext();
              }}
            >
              <BsArrowRightShort />
            </div>
          </div>
          </div>
          </div>
          </div>
        <div class='artworks'>
        <Slider {...settings} ref={sliderRef} >
        {curator.artworks.map((item) => {
            return (<a href={`/store/${item.id}`}>
                <img src={`${item.thumbnail}`}/>
            </a>)
        }
        )} 
        </Slider>
        
        </div>
    </section>)
    :null
    
    ) 

 
}

export default Curator;
