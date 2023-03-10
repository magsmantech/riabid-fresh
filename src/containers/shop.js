import React, { useEffect, useState, useRef } from "react";
import { getArtworks, getArtworksNew } from "../services/artworksService";
import { Link } from "react-router-dom";
import { useQuery,useMutation } from "react-query";
import axios from '../lib/axios';
import RangeSlider from "../components/shared/RangeSlider";
import ProductBlock from "../components/shared/ProductBlock";

import MetaTags from "react-meta-tags";

function Shop(props) {

  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const [data, setData] = useState({'data':[]});
  const [filterType, setFilterType] = useState(0);  
  const [filterPrice, setFilterPrice] = React.useState([0, 1000000]);
  const [filterYear, setFilterYear] = useState([0, 9999]);
  const myGrid = useRef(null);

  useEffect(function(){
    axios.get('artworks-paginated?limit=16')
      .then((res) => {
            let data = res.data;
            setData(data);
      });
  },[])

  var keys = Object.keys(data.data);
  var min = data.data[keys[0]];
  var max = data.data[keys[0]];
  var i;

  for (i = 1; i < keys.length; i++) {
    var value = data.data[keys[i]];
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


  const categories = [
    {'label':'Drawing','value':4},
    {'label':"Sculpture",'value':2},
    {'label':'Mixed Media','value':5},
    {'label':"Photography",'value':3},
    {'label':"Painting",'value':1}
  ];

  // useEffect(function(){
  //   console.log(filterYear)
  // },[filterYear])
  function finishSlider(){
    console.log('finished')
  }

  function handlePagination(e,page){
    e.preventDefault();   
        axios.get("artworks-paginated?limit=16&year_from="+filterYear[0]+"&year_to="+filterYear[1]+"&categories[]="+filterType+"&page="+page)
          .then((res) => {
                let data = res.data;
                setData(data);
          });
  }
  
  return (
    <>
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

    <h1 className='pageHeading'>Artworks</h1>
    <div className="shopSearching">
      <div className="cats searchBox">
        <ul>
          {categories.map((item)=>{
              return <li className={filterType == item.value ? "active" : ""} onClick={(e) => {setFilterType(item.value); handlePagination(e,1)}}>{item.label}</li>
          })}       
        </ul>
      </div>
      <div className="searchBox searchTitle">
        <button className="search"></button>
        <input className="search" placeholder="Search" />
      </div>
      <div className="searchBox searchYears">
        <RangeSlider
                value={filterYear}
                setValue={setFilterYear}                          
                min={1600}
                max={2023}
              ></RangeSlider>
      </div>
      <div className="searchBox searchPrice">
          <input placeholder="Price" />
      </div>
      <div className="searchBox clear"><button onClick={() => {window.location.reload();}}>Clear</button>
      </div>
    </div>
    <div className="row shopG" ref={myGrid} >
            <div className='col-3'>
            {data.data ? (
                    <ProductBlock
                    start={0}
                    limit={4}
                    data={data.data}
                    />
                    ) : null}
            </div>
            <div className='col-3'>
            {data.data ? (
                    <ProductBlock
                    start={4}
                    limit={4}
                    data={data.data}
                    />
                    ) : null}
            </div>
            <div className='col-3'>
            {data.data ? (
                    <ProductBlock
                    start={8}
                    limit={4}
                    data={data.data}
                    />
                    ) : null}
            </div>
            <div className='col-3'>
            {data.data ? (
                    <ProductBlock
                    start={12}
                    limit={4}
                    data={data.data}
                    />
                    ) : null}
            </div>

    </div>
     
    <div className="row productPaginate marginsRight">
                <div className='col-3 prevPage'>
                    <a to="#" onClick={e => { if(data.current_page -1 < data.last_page && data.current_page -1 != 0 ){  handlePagination(e,data.current_page-1);} myGrid.current.scrollIntoView({behavior: 'smooth', block: 'center'}) }}>PREV</a>
                </div>
                <div className='col-6 centerPage'>

                </div>
                <div className='col-3 nextPage'>
                <a to="#" onClick={e => { if(data.current_page +1 < data.last_page){ handlePagination(e,data.current_page+1); } myGrid.current.scrollIntoView({behavior: 'smooth'})}}>NEXT</a>
                </div>
            </div>
       </>
  );
}

export default Shop;
