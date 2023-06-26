import React, { useRef, useState } from "react";
import Slider from "react-slick";
import Card from "./Card";
import cardImg from "../../assets/dummy/cardImage.jpg";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import { useQuery } from "react-query";
import { getCat } from "../../services/settings";

function SharedSlider({
  auction,
  title,
  data,
  slidesToShow,
  special,
  speciaal,
  buttonDisabled,
  link,
}) {
  
const categories = [
  {'name':"ALL ART",'id':0},
  {'name':"PAINTINGS",'id':1},
  {'name':"GRAPHICS",'id':15},
  {'name':"PRINT",'id':4},
  {'name':'SCULPTURE','id':2},
  {'name':'CERAMICS','id':16},  
  {'name':"PHOTOGRAPHY",'id':3},
];

  const sliderRef = useRef();
  const [total,setTotal] = useState(20);
  const [noworks,setNoworks] = useState(0);
  const [categoryType, setCategoryType] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [prevItem, setPrevItem] = useState(0);
  const [progress,setProgress] = useState(0);
  const [dragging,setDragging] = useState(false);
  const [moreLink,setMoreLink] = useState(link);
  const old_data = [...data];
  const {isload,datat,iserror,isfetch,refetch} = useQuery(['categories',categoryType], getCat, {  enabled:false,   refetchOnWindowFocus: false,onSuccess: (new_data) => {
  
  }     }); 



  var settings = {
    draggable:true,
    dots: false,
    infinite: false,
    arrows:false,
    speed: 500,
    centerMode:true,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 1,
    responsive:[{     
      breakpoint:768,   
      settings:{
        slidesToShow:1
      }
  }
  ]
  };
  
  const items = data.map((item) => {
    
    
    
      return (
        <CollectionCard
          id={item.id}
          img={item.image}
          collection_name={item.collection_name}
        />
      );
    
  
  });
  

  return (
    <div className="selectedFor" >
      <div className="head-wrapper">
        <Link to={link}>
          <h3>{title}</h3>
        </Link>
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
          <Link to={moreLink}>
            {buttonDisabled ? null : (
              <button className="btn-placebid showMore">
                <Link to={moreLink}>Show More</Link>
              </button>
            )}
          </Link>
        </div>
      </div>

      <Slider {...settings} ref={sliderRef} >
      {items}
      </Slider>
      <div class='progress' role='progressbar' style={{'backgroundSize':progress+'% 100%'}}>
        <span class='slider__label sr-only'></span>
      </div>

      {data.filter((item) => (parseInt(categoryType) == parseInt(item.category_id) || categoryType == 0)).length ==0 ? (<div className="no_works">No Works Available</div>) : ''}
      
    </div>
  );
}

export default SharedSlider;
