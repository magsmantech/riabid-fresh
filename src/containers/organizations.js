import React from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import cardImg from "../assets/dummy/cardImage.jpg";
import { Link } from "react-router-dom";
import photo from "../assets/images/organizations-1.png";
import { QueryClient, useQuery } from "react-query";
import Loading from "./loading";
import { MetaTags } from "react-meta-tags";
import {getOrganizations} from "../services/organizationService";
const queryClient = new QueryClient();

function Organizations(props) {
  const [filter, setFilter] = React.useState(false);
  const { isLoading, error, data } = useQuery("organizations", getOrganizations, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section id="shop" className="container auctions">
            <ul className="breadcrumb">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#">Organizations</Link>
        </li>
      </ul>
      <div className="full-gallery">
        <div className="text">
          <h1>ART FOR HOMES & ORGANIZATIONS</h1>
          <p>We can talk in detail and analyze your needs. Our program for art house lovers, interior designers, hotels  and architect companies can provide structured outlines according to your demands. Please do not hesitate to send us detailed pictures of your preferable ambiances.
We work directly with you to find the right art for your personality. From the emerging artists till the top stars - we can find any Georgian art that can enhance your way of life. 
We work with many artists who are also open for private orders. Bespoke projects as wall painting, static sculptures, or making site-specific pieces according to your demands - we can recommend artists whose work matches your clients' tastes, colour palette and style.
For both Interiors and private organization please contact:  <a href="mailto:interiorart@riabid.ge">interiorart@riabid.ge. </a>
Send us your inquiry and a small description letter, or call <a href="tel:(+995)599200535">(+995)599200535. </a>
After the successful authorization of your demand we will send you the promo code of 20% discount on your selected artworks.
Ria Bid team</p>
        </div>
        <div className="pictures">
          <img className="bot-new" src={photo}></img>
        </div>
      </div>
      <div className="extra-margins"></div>
      <div className="grid-container-auctions">
      <div className="flex space-between">
          <ul className="breadcrumb">
            <li>
              <Link to="/store">
                Artworks (
                {data.data.data.length})
              </Link>
            </li>
          </ul>
        </div>
          {data.data.data.map((item) => (
            <div key={item.id} className="product flex column">
              <Link to={"/store/" + item.id}>
                <div className="img">
                  <img
                    src={item.image.replace(
                      "https://api.riabid.ge/storage/artworks/",
                      "https://api.riabid.ge/storage/artworks/thumbnail_"
                    )}
                  ></img>
                </div>

                <p className="title">
                  <i>{item.title}</i>
                </p>
                <p className="title2">{item.display_name}</p>
              </Link>
              {item.request_price ? (
                <div className="flex space-between">
                  <div className="flex">
                    <p className="price">Contact for Price</p>
                  </div>
                  <p className="time gray"></p>
                </div>
              ) : item.current_bid ? (
                <div className="flex space-between">
                  <div className="flex">
                    <p className="price">₾{item.current_bid}</p>
                    <p className="price gray">₾{item.buy_it_now}</p>
                  </div>
                  <p className="time gray"></p>
                </div>
              ) : (
                <div className="flex space-between">
                  <div className="flex">
                    <p className="price">
                      {item.is_geo
                        ? `₾${item.buy_it_now}`
                        : `$${item.price_usd}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
    </section>
  );
}

export default Organizations;
