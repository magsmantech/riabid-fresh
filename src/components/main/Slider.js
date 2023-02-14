import React from "react";
import Slider from "react-slick";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import Slide from "./Slide";
import { getPress } from "../../services/dashboardService";
import { getCoverImages } from "../../services/settings";
import { useQuery } from "react-query";

// const coverImages = getCoverImages.data ? getCoverImages.data.data : [];
// console.log(coverImages)
function SliderComp({ activeSlide, setActiveSlide, heroSliderRef }) {
  const {innerWidth, innerHeight} = window;

  const settings = {
    dots: true,
    infinite: true,
    speed: 4000,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    lazyLoad: true,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const coverImages = useQuery("cover-images", getCoverImages, {
    refetchOnWindowFocus: false,
  });
  const coverData = coverImages.data ? coverImages.data.data : [];

  return (
    <Slider {...settings} ref={heroSliderRef}>
      {coverData
        ? coverData.map((e) => (
            <Slide
              img={innerWidth > 500 ? e.image_link : e.image_link_mobile}
              alt={e.title}
              // author="A.W."
              text={e.title}
              btn={{
                action: () => window.location.href("/store"),
                text: "Browse art",
              }}
            />
          ))
        : null}
    </Slider>
  );
}

export default SliderComp;
