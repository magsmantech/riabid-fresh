import React from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

function Tracker({ activeSlide, slideCount, heroSliderRef }) {
  const SampleNextArrow = () => {
    return (
      <div
        className={
          activeSlide === 2 //fetched array length
            ? "arrow arrow-next arrow-disabled"
            : "arrow arrow-next"
        }
        onClick={() => heroSliderRef.current.slickNext()}
      >
        <BsArrowRightShort style={{ fontSize: "45px" }} />
      </div>
    );
  };
  const SamplePrevArrow = () => {
    return (
      <div
        className={
          activeSlide === 0
            ? "arrow arrow-prev arrow-disabled"
            : "arrow arrow-prev"
        }
        onClick={() => heroSliderRef.current.slickPrev()}
      >
        <BsArrowLeftShort style={{ fontSize: "45px" }} />
      </div>
    );
  };
  return (
    <div className="hero-actions">
      <div className="container">
        <div className="tracker-wrapper">
          <p>01</p>
          <div className="tracker">
            <div
              className="tracker-handle"
              style={{
                height: `${((activeSlide + 1) * 100) / slideCount}% `,
                transition: "height .5s ease",
              }}
            />
          </div>
          <p>{slideCount >= 9 ? slideCount : "0" + slideCount}</p>
        </div>
        <div className="arrows-wrapper">
          {SamplePrevArrow()}
          {SampleNextArrow()}
        </div>
      </div>
    </div>
  );
}

export default Tracker;
