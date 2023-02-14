import React, { useState, useRef } from "react";
import Slider from "./Slider";
import Tracker from "./Tracker";

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroSliderRef = useRef();
  return (
    <div className="hero-wrapper">
      {/*<Tracker
        activeSlide={activeSlide}
        slideCount={3}
        heroSliderRef={heroSliderRef}
      />*/}
      <Slider
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
        heroSliderRef={heroSliderRef}
      />
    </div>
  );
}

export default Hero;
