import React, { useEffect, useState } from "react";

import {
  getArtworks,
  getArtworksNew,
  getArtworksRecomended,
} from "../services/artworksService";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "./loading";
import sold from "../assets/sold.png";
import RangeSlider from "../components/shared/RangeSlider";
import ScrollToTopOnMount from "../components/shared/ScrollToTop";
import Pagination from "./Pagination";
import { FaStar } from "react-icons/fa";
import { getCollection } from "../services/collectionService";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

function Collection(props) {
  const categories = [
    "Painting",
    "Sculpture",
    "Photography",
    "Print",
    "Drawing, Collage or other Work on Paper",
    "Mixed Media",
    "Performance Art",
    "Installation",
    "Video/Film/Animation",
    "Architecture",
    "Fashion Design and Wearable Art",
    "Jewelry",
    "Design/Decorative Art",
    "Textile Arts",
    "Other",
  ];
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);

  const { isLoading, error, data } = useQuery(
    "collection" + props.match.params.id,
    () => getCollection(props.match.params.id),
    {
      refetchOnWindowFocus: false,
    }
  );

  const [filterType, setFilterType] = useState("");
  const [categoryType, setCategoryType] = useState([]);
  const [filterPrice, setFilterPrice] = React.useState([0, 1000000]);
  const [filterYear, setFilterYear] = useState([0, 9999]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  const getPrivilegedIcon = (privileged) =>
    privileged ? (
      <FaStar
        size="20px"
        style={{
          position: "absolute",
          top: "-20px",
          right: "20px",
          color: "#fcba03",
          zIndex: 5,
        }}
      />
    ) : null;

  return (
    <section id="shop" className="container galleries">
      <ul className="breadcrumb">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#">Collections</Link>
        </li>
        <li>
          <Link to={"/collections/" + data.data.id}>
            {data.data.collection_name}
          </Link>
        </li>
      </ul>
      <div className="full-gallery">
        <div className="text">
          <h1>{data.data.collection_name}</h1>
          {ReactHtmlParser(data.data.description)}
        </div>
        <div className="pictures">
          <img className="bot-new" src={data.data.image}></img>
        </div>
      </div>
      <section id="shop" className="container auctions shop">
        <div className="flex space-between">
          <ul className="breadcrumb">
            <li>
              <Link to="/store">
                {data.data.collection_name} Collection Artworks (
                {data.data.artworks.length})
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="grid-container-auctions">
            {data.data.artworks.map((item) => (
              <div key={item.id} className="product flex column">
                <Link to={"/store/" + item.id} style={{ position: "relative" }}>
                  {item.is_sold ? (
                    <div className="sold">
                      <img src={sold}></img>
                    </div>
                  ) : null}
                  <div className="img">
                    {getPrivilegedIcon(item.privileged)}
                    <img
                      src={item.thumbnail}
                    ></img>
                  </div>
                </Link>
                <Link to={"/store/" + item.id} style={{ position: "relative" }}>
                  <p className="title">
                    <i>{item.title}</i>
                  </p>
                </Link>
                <Link to={"/artists/" + item.artist_id} className="title2">
                  {item.display_name}
                </Link>
                {item.current_bid ? (
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
          <div></div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={
              data.data.artworks
                .filter(
                  (item) =>
                    item.buy_it_now >= filterPrice[0] &&
                    item.buy_it_now <= filterPrice[1]
                )
                .filter(
                  (item) =>
                    item.year >= filterYear[0] && item.year <= filterYear[1]
                )
                .filter(
                  (item) => item.product_type == filterType || filterType == ""
                )
                .filter(
                  (item) =>
                    categoryType.includes(item.category_id?.toString()) ||
                    categoryType.length === 0
                ).length
            }
            currentPage={currentPage}
            paginate={paginate}
          ></Pagination>
        </div>
      </section>
    </section>
  );
}

export default Collection;
