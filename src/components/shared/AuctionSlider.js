import React, { useRef, useState } from "react";
import Slider from "react-slick";
import Card from "./Card";
import cardImg from "../../assets/dummy/cardImage.jpg";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import { red } from "@material-ui/core/colors";

function AuctionSlider({
  auction,
  title,
  data,
  slidesToShow,
  special,
  speciaal,
  buttonDisabled,
  link,
}) {
  const sliderRef = useRef();
  const [activeItem, setActiveItem] = useState(0);
  const [prevItem, setPrevItem] = useState(0);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,

    beforeChange: (current, next) => setActiveItem(next),
    responsive: [
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: slidesToShow - 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 726,
        settings: {
          slidesToShow: slidesToShow > 3 ? slidesToShow - 2 : slidesToShow - 1,
          slidesToScroll: 2,
          // initialSlide: 0,
        },
      },
      {
        breakpoint: 501,
        settings: {
          variableWidth:true,
          centerMode:true,
          slidesToShow: 1,
          // slidesToShow: slidesToShow > 3 ? slidesToShow - 3 : slidesToShow - 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const items = data.map((item) => {
    if (!special) {
      return (
        <Card
          privileged={item.privileged}
          is_geo={item.is_geo}
          price_usd={item.price_usd}
          key={item.id}
          index={item.id}
          type={item.on_auction}
          name={item.title}
          img={item.image}
          sold={item.is_sold}
          price={item.current_bid}
          display_name={item.display_name}
          secondParam={item.on_auction ? item.current_bid : undefined}
          end_time={item.end_time}
          special={special}
          collection={item.collection}
          width={item.width}
          height={item.height}
          depth={item.depth}
        />
      );
    } else {
      return (
        <CollectionCard
          id={item.id}
          img={item.image}
          collection_name={item.collection_name}
        />
      );
    }
  });
  return (
    <div className="selectedFor container">
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
          <Link to={link}>
            {buttonDisabled ? null : (
              <button className="btn-placebid">
                <Link to={link}>Show More</Link>
              </button>
            )}
          </Link>
        </div>
      </div>
      
      <Slider {...settings} ref={sliderRef}>
      {data.map((item) => (
          <div key={item.id} className="product flex column">
            <Link to={"/store/" + item.id}>
              <div className="img">
                <div class='group'>
                  <img src={item.image}></img>
                </div>
              </div>
            <div class='title_tag'>
              <p className="title">
                <i>{item.title}</i>
              </p>
              <p className="title2">{item.display_name}</p>
              </div>
            </Link>
            {item.is_geo ? (
            <div className="flex space-between price_tag">
              <div className="gr">
                
                <p className="price auc-red">₾{item.current_bid}</p>
              </div>
            </div>
            ):
            (
              <div className="flex space-between price_tag">
              <div className="gr">
                <p className="price auc-red">${item.current_bid_usd}</p>
              </div>
            </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AuctionSlider;
