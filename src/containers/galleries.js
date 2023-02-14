import React from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import cardImg from "../assets/dummy/gallery.png";
import { Link } from "react-router-dom";
import { getGalleries } from "../services/galleriesService";
import { useQuery } from "react-query";
import Loading from "./loading";
import { MetaTags } from "react-meta-tags";

function Galleries(props) {
  const [filter, setFilter] = React.useState(false);
  const { isLoading, error, data } = useQuery("galleries", getGalleries, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section id="shop" className="container galleries">
      <MetaTags>
        <title>Art Galleries on Ria Bid</title>
        <meta
          name="description"
          content="Browse digital galleries.Travel digital art."
        />
        <meta
          name="keywords"
          content="art gallery, art online, galleries, sell art, decorative art,Discover Contemporary Artists, contemporary artists from Georgia,georgian contemporary artists,"
        />
      </MetaTags>
      <ul className="breadcrumb">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/auctions">Galleries</Link>
        </li>
      </ul>
      <div className="grid-container-galleries">
        {data.data
          .filter((item) => item.is_hidden === 0)
          .map((item) => (
            <div key={item.id} className="product flex column">
              <Link
                to={"/galleries/" + item.id}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="img">
                  <img src={item.legal_image}></img>
                </div>

                <p className="title">{item.gallery_title}</p>
              </Link>
              <div className="flex space-between">
                <div className="flex">
                  <p className="location">{item.location}</p>
                </div>
                <Link to={"/galleries/" + item.id}>
                  <button className="main-button">View Gallery</button>
                </Link>
              </div>
            </div>
          ))}
        {data.data.filter((item) => item.is_hidden === 0).length === 0
          ? "There are no galleries yet"
          : null}
      </div>
    </section>
  );
}

export default Galleries;
