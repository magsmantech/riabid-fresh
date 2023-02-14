import React, { useEffect, useState } from "react";

import {
  getArtworks,
  getArtworksNew,
  getArtworksRecomended,
} from "../services/artworksService";
import {
  addBag,
  addComment,
  addFavorites,
  requestPrice,
} from "../services/bagService";
import { Link, useLocation } from "react-router-dom";
import { useQuery,useMutation } from "react-query";
import Loading from "./loading";
import sold from "../assets/sold.png";

import RangeSlider from "../components/shared/RangeSlider";
import ScrollToTopOnMount from "../components/shared/ScrollToTop";
import Pagination from "./Pagination";
import { FaStar } from "react-icons/fa";

import { toast } from "react-toastify";

function Recomended(props) {
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

  console.log(props.match.params.id);
  const { isLoading, error, data } = useQuery(
    "recomended" + props.match.params.id,
    () => getArtworksRecomended(props.match.params.id),
    {
      refetchOnWindowFocus: false,
    }
  );
  const [filterType, setFilterType] = useState("");
  const [categoryType, setCategoryType] = useState([]);
  const [filterPrice, setFilterPrice] = React.useState([0, 1000000]);
  const [filterYear, setFilterYear] = useState([0, 9999]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewAll, setViewAll] = useState(false);

  const [postsPerPage, setPostsPerPage] = useState(12);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = (pageNumber) => {
    setViewAll(false);

    setCurrentPage(pageNumber);
  };

  const favoritesMutation = useMutation(addFavorites, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error("You need to login");
    },
    onSuccess: (data, variables, context) => {
      toast.dark("Artwork added to favorites", {
        progress: undefined,
        hideProgressBar: true,
      });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

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



  var keys = Object.keys(data.data);
  var min = data.data[keys[0]].buy_it_now; // ignoring case of empty list for conciseness
  var max = data.data[keys[0]].buy_it_now;
  var i;

  for (i = 1; i < keys.length; i++) {
    var value = data.data[keys[i]]?.buy_it_now;
    if (value < min) min = value;
    if (value > max) max = value;
  }
  const years = [];
  for (i = 1; i < keys.length; i++) {
    years.push(data.data[keys[i]].year);
  }

  var minYear = data?.data[keys[0]]?.year; // ignoring case of empty list for conciseness
  var maxYear = data?.data[keys[0]]?.year;

  for (i = 1; i < keys.length; i++) {
    var value = data.data[keys[i]].year;
    if (value < minYear) minYear = value;
    if (value > maxYear) maxYear = value;
  }

  let filteredData = data.data
    .filter(
      (item) =>
        item.buy_it_now >= filterPrice[0] && item.buy_it_now <= filterPrice[1]
    )
    .filter((item) => item.year >= filterYear[0] && item.year <= filterYear[1])
    .filter((item) => item.product_type == filterType || filterType == "")
    .filter(
      (item) =>
        categoryType.includes(item.category_id?.toString()) ||
        categoryType.length === 0
    )
    .slice(
      isViewAll ? 0 : indexOfFirstPost,
      isViewAll ? data.data.length - 1 : indexOfLastPost
    );
  return (
    <section id="shop" className="container auctions shop">
      <div className="flex space-between">
        <ul className="breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/store">Artworks ({data.data.length})</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="shop-grid">
        <div className="new-shop">
        {filteredData.map((item) => (
              <div key={item.id} className="product flex column">
                <Link to={"/store/" + item.id} style={{ position: "relative" }}>
                  {item.is_sold ? (
                    <div className="sold">
                      {/* {getPrivilegedIcon(item.privileged)} */}
                      <img loading="lazy" alt="Sold image" src={sold}></img>
                    </div>
                  ) : null}
                  <div className="img">
                  {getPrivilegedIcon(item.privileged)}
                    <div class='group'>
                    
                    <img
                      alt={item.title}
                      loading="lazy"
                      src={item.thumbnail}
                    ></img>
                    </div>
                  </div>
                </Link>
                    <div class='title_tag'>
                <Link to={"/store/" + item.id} style={{ position: "relative" }}>
                  <p className="title">
                    <i>{item.title}</i>
                  </p>
                </Link>
                <Link to={"/artists/" + item.artist_id} className="title2">
                  {item.display_name}
                </Link>
                
                <p className="depth">{item.width}x{item.height}{item.depth ? ('x'+item.depth) : null } cm</p>
                  </div>
                {item.request_price ? (
                  <div className="flex space-between price_tag">
                    <div className="flex">
                      <p className="price">Contact for Price</p>
                      <span class='heart' onClick={() => favoritesMutation.mutate(item.id)}></span>
                    </div>
                    <p className="time gray"></p>
                  </div>
                ) : item.current_bid ? (
                  <div className="flex space-between price_tag">
                    <div className="flex">
                      <p className="price">₾{item.current_bid}</p>
                      <p className="price gray">₾{item.buy_it_now}</p>
                      <span class='heart' onClick={() => favoritesMutation.mutate(item.id)}></span>
                    </div>
                    <p className="time gray"></p>
                  </div>
                ) : (
                  <div className="flex space-between price_tag">
                    <div className="flex">
                      <p className="price">
                        {item.is_geo
                          ? `₾${item.buy_it_now}`
                          : `$${item.price_usd}`}
                      </p>
                      <span class='heart' onClick={() => favoritesMutation.mutate(item.id)}></span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div></div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data.data.length}
          currentPage={currentPage}
          paginate={paginate}
          hasViewAll
          viewAllFn={() => setViewAll(true)}
        ></Pagination>
      </div>
    </section>
  );
}

export default Recomended;
