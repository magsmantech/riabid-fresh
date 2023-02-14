import React, { useEffect, useState } from "react";

import {
  getArtworks,
  getArtworksNew,
  getArtworksPride,
  getArtworksSpecial
} from "../services/artworksService";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "./loading";
import sold from "../assets/sold.png";
import RangeSlider from "../components/shared/RangeSlider";
import ScrollToTopOnMount from "../components/shared/ScrollToTop";
import Pagination from "./Pagination";
import { MultiSelect } from 'primereact/multiselect';
import MetaTags from "react-meta-tags";
import { FaStar } from "react-icons/fa";

function Pride(props) {
  const categories = [
    {'label':"Painting",'value':1},
    {'label':"Sculpture",'value':2},
    {'label':"Photography",'value':3},
    {'label':'Drawing, Collage or other Work on Paper','value':4},
    {'label':'Mixed Media','value':5},
    {'label':'Performance Art','value':6},
    {'label':'Installation','value':7},
    {'label':'Video/Film/Animation','value':8},
    {'label':'Architecture','value':9},
    {'label':'Fashion Design and Wearable Art','value':10},
    {'label':'Jewelry','value':11},
    {'label':'Design/Decorative Art','value':12},
    {'label':'Textile Arts','value':13},
    {'label':'Graphics','value':14},
    {'label':'Ceramics','value':15},
    {'label':'Other','value':16},
    {'label':'NFT','value':17}
  ];
  const FilterSelectItems = [
    {label: 'Private Collection', value: 1},
    {label: 'Gallery', value: 2},
  ];
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);

  const { isLoading, error, data } = useQuery(
    "pride" + props.match.params.id,
    () => getArtworksSpecial(props.match.params.id),
    {
      refetchOnWindowFocus: false,
    }
  );
  const [filterType, setFilterType] = useState("");
  const [categoryType, setCategoryType] = useState([]);
  const [filterPrice, setFilterPrice] = React.useState([0, 1000000]);
  const [filterYear, setFilterYear] = useState([0, 9999]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [isViewAll, setViewAll] = useState(false);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = (pageNumber) => {
    setViewAll(false);
    setCurrentPage(pageNumber);
  };
  const removeItemOnce = (arr, value) => {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };
  const getPrivilegedIcon = (privileged) =>
  privileged ? (
    // <img src={Star} alt="privileged-icon" style={{
    //   width: '20px',
    //   height: '20px',
    //   position: 'absolute',
    //   zIndex: 5,
    //   right: '10px',
    //   top: '-10px'
    // }}></img> ) :
    <FaStar
      size="20px"
      style={{
        position: "absolute",
        top: "0px",
        right: "3px",
        color: "#fcba03",
        zIndex: 5,
      }}
    />
  ) : null;


  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

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
    .filter((item) => filterType.includes(item.product_type) || filterType.length ===0)
    .filter(
      (item) =>
        categoryType.includes(item.category_id) ||
        categoryType.length === 0
    )
    .slice(indexOfFirstPost, indexOfLastPost);
  const sortFilteredData = () => {
    console.log(filteredData);
    filteredData = data.data.sort((a, b) => b.id - a.id);
    console.log(filteredData);
  };

  return (
    <section>


<link rel="stylesheet" href="https://unpkg.com/primeicons/primeicons.css" />
    <link rel="stylesheet" href="https://unpkg.com/primereact/resources/themes/lara-light-indigo/theme.css" />
    <link rel="stylesheet" href="https://unpkg.com/primereact/resources/primereact.min.css" />

           <div className='shop_filter'>
          <div className='container'>
              <div className='fullA'>SHOP ALL ART</div>
              <div className="fullA">
            <div className="box">
            { filterType.length ==0 ? (<label>Product Type</label>):null}
            <MultiSelect value={filterType} options={FilterSelectItems} onChange={(e) => setFilterType(e.value)} />
            </div>

            <div className="box boxS">
            { categoryType.length ==0 ? (<label>Sort</label>):null}
              <MultiSelect value={categoryType} options={categories} onChange={(e) => setCategoryType(e.value)} />
            </div>
            <div className="box forrangeSlide">          
            <h2>Years</h2>
            <RangeSlider
                value={filterYear}
                setValue={setFilterYear}
                min={1600}
                max={2022}
              ></RangeSlider>
       
        
            </div>

            <div className="box boxS forrangeSlide">          
            <h2>Price</h2>
            <RangeSlider
                value={filterPrice}
                setValue={setFilterPrice}
                min={min}
                max={max}
              ></RangeSlider>
       
        
            </div>


            <button onClick={() => {window.location.reload();}} className="main-button clearButton">Clear</button>
         

          </div>
          </div>
      </div>
    
    <section id="shop" className="container auctions shop">
      <MetaTags>
        <title>ARTWORKS: Ria Bid | Store</title>
        <meta
          name="description"
          content="Find the work of the desired artist on Riabid."
        />
        <meta
          name="keywords"
          content="artworks, buy art, designer, sell art, art price, fine art auctions,Artwork made by the contemporary artists in the Georgians,artists Georgian,Georgia's 10 Contemporary Artists,Georgian artist works prices,i wants see georgian contemporary artists,georgian contemporary artists,"
        />
      </MetaTags>
      
     

 

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
                      <span class='heart'></span>
                    </div>
                    <p className="time gray"></p>
                  </div>
                ) : item.current_bid ? (
                  <div className="flex space-between price_tag">
                    <div className="flex">
                      <p className="price">₾{item.current_bid}</p>
                      <p className="price gray">₾{item.buy_it_now}</p>
                      <span class='heart'></span>
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
                      <span class='heart'></span>
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
            data.data
              .filter(
                (item) =>
                  item.buy_it_now >= filterPrice[0] &&
                  item.buy_it_now <= filterPrice[1]
              )
              .filter(
                (item) =>
                  item.year >= filterYear[0] && item.year <= filterYear[1]
              )
              .filter((item) => filterType.includes(item.product_type) || filterType.length ===0)
              .filter(
                (item) =>
                  categoryType.includes(item.category_id) ||
                  categoryType.length === 0
              ).length
          }
          currentPage={currentPage}
          paginate={paginate}
          hasViewAll
          viewAllFn={() => setViewAll(true)}
        ></Pagination>
      </div>
    </section>
    </section>
  );
}

export default Pride;
