import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/banners/img1.png";
import img2 from "../../assets/banners/img2.png";

function Banners() {
  return (
    <div className="banners-wrapper container">
      <div className="banner-item-wrapper orange">
        <img src={img1} alt="" />
        <div className="banner-item-content-wrapper">
          <p>Popular artworks</p>
          <button className="btn-placebid">
            <Link to="/store">VIEW ALL</Link>
          </button>
        </div>
      </div>
      <div className="banner-item-wrapper blue">
        <img src={img2} alt="" />
        <div className="banner-item-content-wrapper">
          <p>Auctions</p>
          <button className="btn-placebid">
            <Link to="/auctions">VIEW ALL</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banners;
