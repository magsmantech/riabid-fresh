import React, { useRef, useState,useEffect } from "react";

import {
  getArtworks,
  getArtworksNew,
  getArtworksRecomended,
} from "../services/artworksService";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "./loading";
import sold from "../assets/sold.png";
import author_photo from "../assets/author-photo.png";
import instagram from "../assets/images/instagram.svg";
import facebook from "../assets/images/facebook.svg";
import twitter from "../assets/images/twitter.svg";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import RangeSlider from "../components/shared/RangeSlider";
import ScrollToTopOnMount from "../components/shared/ScrollToTop";
import Pagination from "./Pagination";
import { FaStar } from "react-icons/fa";
import { getCurator } from "../services/curatorService";
import { MetaTags } from "react-meta-tags";
import Slider from "react-slick";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import axios from '../lib/axios';
import ProductBlock from "../components/shared/ProductBlock";

function Curator_html(props) {

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

  function divideBoxIntoColumns(boxWidth,columns) {
    const columnWidth = Math.floor(boxWidth / columns);
    const remainder = boxWidth % columns;
    return [columnWidth + (remainder > 0 ? 1 : 0), columnWidth + (remainder > 1 ? 1 : 0), columnWidth + (remainder > 2 ? 1 : 0), columnWidth];
  }


  const [boxLength, setBoxLength] = useState([]);
  const [show, setShow] = useState(4); 
  const [artworks, setArtworks] = useState({'data':[]});

  useEffect(function(){
    axios.get("artworks-paginated?limit=16")
        .then((res) => {
              let addon_data = res.data;
            
              addon_data['data'] = [...addon_data.data];       
              
              setArtworks(addon_data);
              let arr = divideBoxIntoColumns(addon_data.data.length,show);
              setBoxLength(arr)
        });   
  },[])




  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  return (
    
        curator ? (
    <section className="curator_page">


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
        
        
        <div className="row">
            <div className="offset-md-1 col-md-2">
                <img src={author_photo} className='w-100 marginBottom'/>
            </div>
            <div className="offset-md-2 col-md-5">
                <h1 className="col-6 col-md-12">Guram Tsibakhashvili</h1>
                <div className="offset-1 offset-md-0 text">
                Bugadze Gallery is an Art gallery based in Tbilisi, Georgia in the old, unique building, which is a cultural heritage of the country, both architecturally and historically. The house was built by the Zubalashvili brothers at the end of 19th century and a lot of famous figures from our history, lived here during different times: founder of the Georgian avant-garde Irakli Gamrekeli, Marjorie and Oliver Wardrop British scholars and translators, Pavle Ingorokva — the greatest researcher of Georgian history and literature, Shalva Alexi-Meskhishvili, the Minister of Justice of the First Republic of Georgia and Mikael Tariverdiev, one of the most popular composers of the Soviet period.
                </div>
                <div className="row links">
                    <div className="col-8">
                        <ul className="socials">
                            <li><a href="#"><img src={instagram}/></a></li>
                            <li><a href="#"><img src={facebook}/></a></li>
                            <li><a href="#"><img src={twitter}/></a></li>
                        </ul>
                        <a href="#" className="siteLink">myfirstwebsite.com</a>
                    </div>
                    <div className="col-4 flex align-items-end">
                        <a href="#" className='statement'>curatorial statement</a>
                    </div>
                </div>
            </div>
            <div className='row curatedArtworks' >
                <h1>curated artworks</h1>

            <div className='col-6 col-lg-3'>



              {artworks.data && boxLength.hasOwnProperty(0) && <ProductBlock
                    start={0}
                    limit={boxLength[0]}
                    data={artworks.data}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {artworks.data && boxLength.hasOwnProperty(1) && <ProductBlock
                    start={boxLength[0]}
                    limit={boxLength[1]}
                    data={artworks.data}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {artworks.data && boxLength.hasOwnProperty(2) && <ProductBlock
                    start={boxLength[1]+boxLength[0]}
                    limit={boxLength[2]}
                    data={artworks.data}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {artworks.data && boxLength.hasOwnProperty(3) && <ProductBlock
                    start={boxLength[2] + +boxLength[1] + +boxLength[0]}
                    limit={boxLength[3]}
                    data={artworks.data}
                    /> }
            </div>

            </div>
        </div>

     
    </section>)
    :null
    
    ) 

 
}

export default Curator_html;
