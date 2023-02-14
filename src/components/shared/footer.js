import React from "react";
import logo from "../../assets/logo-text.svg";
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
  return (
    <div class='footerBg'>
    <footer>  
      <div className='row'>
        <div className="col-4">
          <h2>Art for homes & organizations</h2>
          <p>
          We can talk in detail and analyze your needs. Our program for art house lovers, interior designers, hotels and architect companies can provide structured outlines according to your demands. 
          </p>
          <a href="#" className='download'>download.pdf</a>          
        
        </div>
        <div className='col-2'>
        <p>Newsletter</p>
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
              <p>Email: help@riabid.ge</p>
              <p>Phone: +995 599-200-535</p>
            </div>
        </div>
        <div className="secondLine">
          Logo 
          <ul>
            <li><Link href="#">Info</Link></li>
            <li><Link href="#">Delivery</Link></li>
            <li><Link href="#">Terms & Conditions</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Additional Information</Link></li>
          </ul>

             
          <div className="social-list">
              <a href="https://instagram.com/ria.bid?igshid=1zjuzuv6w5pf">
                <FaInstagram size="2em" />
              </a>
              <a href="https://twitter.com/bid_ria/">
                <FaTwitter size="2em" />
              </a>
              <a href="https://www.pinterest.com/ria_bid/">
                <FaPinterest size="2em" />
              </a>
            </div>
        </div>
    </footer>
    </div>
  );
}

export default footer;
