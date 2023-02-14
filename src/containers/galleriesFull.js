import React from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import cardImg from "../assets/dummy/gallery-dummy.png";
import cardImg2 from "../assets/dummy/gallery-dummy2.png";

import { Link } from "react-router-dom";
import { getGallery } from "../services/galleriesService";
import { useQuery } from "react-query";
import Loading from "./loading";

function GalleriesFull(props) {
  const [filter, setFilter] = React.useState(false);
  const { isLoading, error, data } = useQuery(
    "gallery",
    () => getGallery(props.match.params.index),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  const { gallery_title, location, legal_image, id, gallery_description } =
    data.data.gallery;
  return (
    <section id="shop" className="container galleries">
      <ul className="breadcrumb">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/galleries">Galleries</Link>
        </li>
        <li>
          <Link to={"/auctions/" + id}>{gallery_title}</Link>
        </li>
      </ul>
      <div className="full-gallery">
        <div className="text">
          <h1>{gallery_title}</h1>
          <p>{location}</p>
          <p>{gallery_description}</p>
        </div>
        <div className="pictures">
          <img className="bot" src={legal_image}></img>
        </div>
      </div>
      <section id="shop" className="container auctions">
        <div className="grid-container-auctions">
          {data.data.artworks.map((item) => (
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
    </section>
  );
}

export default GalleriesFull;
