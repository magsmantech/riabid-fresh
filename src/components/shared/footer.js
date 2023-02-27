import React from "react";
import ln from "../../assets/logo-new.svg";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Subscribe from "./Subscribe";

function footer() {
  console.log('footer mounted')
  return (
    <div className='footerBg'>
    <footer>  
      <div className='row'>
        <div className="col-6">
          <div className="maxWidth">
            <h2>Art for homes & organizations</h2>
            <p>
            We can talk in detail and analyze your needs. Our program for art house lovers, interior designers, hotels and architect companies can provide structured outlines according to your demands. 
            </p>
            <a to="#" className='download'>download.pdf</a>          
          </div>
        </div>
        <div className='col-2'>
        <h4>Newsletter</h4>
        <p>Ria Bid is a fundraising online auction oriented towards buying and selling Georgian art.</p>
          <Subscribe></Subscribe>
        </div>
      
            <div className="col-2">
              <h4>Come see us</h4>
              <p>If you would like to see an artwork in person, visit our Gallery Showroom</p>
              <p>5 Besiki Street , Tbilisi 0108</p>
            </div>

            <div className="col-2">
              <h4>Contacts</h4>
              <p>Email: help@riabid.ge<br/>
              Phone: +995 599-200-535</p>
            </div>
        </div>
        <div className="secondLine">
        <img className="logo" src={ln} alt="logo" /> 
          <ul>
            <li><Link to="#">Info</Link></li>
            <li><Link to="#">Delivery</Link></li>
            <li><Link to="#">Terms & Conditions</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Additional Information</Link></li>
          </ul>

             
          <div className="social-list">
              <a to="https://instagram.com/ria.bid?igshid=1zjuzuv6w5pf">
                <FaInstagram size="14px" />
              </a>
           
              <a to="https://www.pinterest.com/ria_bid/">
                <FaPinterest size="14px" />
              </a>
              <a to="https://twitter.com/bid_ria/">
                <FaTwitter size="14px" />
              </a>
            </div>
        </div>
    </footer>
    </div>
  );
}

export default footer;
