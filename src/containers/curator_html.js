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

  function divideBoxIntoColumns(boxWidth,columns) {
    const columnWidth = Math.floor(boxWidth / columns);
    const remainder = boxWidth % columns;
    return [columnWidth + (remainder > 0 ? 1 : 0), columnWidth + (remainder > 1 ? 1 : 0), columnWidth + (remainder > 2 ? 1 : 0), columnWidth];
  }

  const [boxLength, setBoxLength] = useState([]);
  const [show, setShow] = useState(4); 
  const [artworks, setArtworks] = useState({'data':[]});

  useEffect(function(){
    axios.get("/curators/"+props.match.params.id+"/artworks")
        .then((res) => {          
              setArtworks(res.data.data);
              console.log(res.data.data);
              let arr = divideBoxIntoColumns(res.data.data.artworks.length,show);
              setBoxLength(arr)
        });   
  },[])

  return (
    
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
                <img src={artworks && artworks?.curator?.curator_biography?.image} className='w-100 marginBottom'/>
            </div>
            <div className="offset-md-2 col-md-5">
              {artworks &&  <h1 className="col-6 col-md-12">{artworks?.curator?.curator_biography?.curator_name}</h1>}
                <div className="offset-1 offset-md-0 text">
                {artworks && ReactHtmlParser(artworks?.curator?.curator_biography?.curator_biography)}
                </div>
                <div className="row links">
                    <div className="col-8">
                        <ul className="socials">
                          {artworks &&   <li><a href={artworks?.curator?.curator_biography?.instagram_link} target="_BLANK"><img src={instagram}/></a></li> }
                          {artworks &&   <li><a href={artworks?.curator?.curator_biography?.facebook_link} ><img src={facebook}/></a></li>}
                          {artworks &&   <li><a href={artworks?.curator?.curator_biography?.twitter_link}><img src={twitter}/></a></li>}
                        </ul>
                       {artworks && artworks?.curator?.curator_biography?.website && <a href={artworks?.curator?.curator_biography?.website} className="siteLink">{artworks?.curator?.curator_biography?.website}</a>}
                    </div>
                    <div className="col-4 flex align-items-end">
                    {artworks && artworks?.curator?.curator_biography?.file && <a href={artworks?.curator?.curator_biography?.file} className='statement'>curatorial statement</a>}
                    </div>
                </div>
            </div>
            <div className='row curatedArtworks' >
                <h1>curated artworks</h1>

            <div className='col-6 col-lg-3'>



              {artworks.artworks && boxLength.hasOwnProperty(0) && <ProductBlock
                    start={0}
                    limit={boxLength[0]}
                    data={artworks.artworks}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {artworks.artworks && boxLength.hasOwnProperty(1) && <ProductBlock
                    start={boxLength[0]}
                    limit={boxLength[1]}
                    data={artworks.artworks}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {artworks.artworks && boxLength.hasOwnProperty(2) && <ProductBlock
                    start={boxLength[1]+boxLength[0]}
                    limit={boxLength[2]}
                    data={artworks.artworks}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {artworks.artworks && boxLength.hasOwnProperty(3) && <ProductBlock
                    start={boxLength[2] + +boxLength[1] + +boxLength[0]}
                    limit={boxLength[3]}
                    data={artworks.artworks}
                    /> }
            </div>

            </div>
        </div>

     
    </section>
    
    ) 

 
}

export default Curator_html;