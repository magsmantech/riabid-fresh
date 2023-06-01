import React, { useEffect, useState, useRef } from "react";
import { getArtworks, getArtworksNew } from "../services/artworksService";
import { Link } from "react-router-dom";
import { useQuery,useMutation } from "react-query";
import axios from '../lib/axios';
import RangeSlider from "../components/shared/RangeSlider";
import ProductBlock from "../components/shared/ProductBlock";

import MetaTags from "react-meta-tags";

function Shop(props) {
  const [limitColumn, setLimitColumn] = useState(4);
  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(false);
  const [data, setData] = useState({'data':[]});
  const [filterType, setFilterType] = useState(0);  
  const [myMin,setMyMin] = useState(1600);
  const [filterPrice, setFilterPrice] = React.useState([0, 1000000]);
  const [filterYear, setFilterYear] = useState([0, 9999]);
  const myGrid = useRef(null);
  const [boxLength, setBoxLength] = useState([]);
  const [show, setShow] = useState(4); 

  useEffect(function(){
    axios.get('artworks-paginated?limit=16')
      .then((res) => {
            let data = res.data;
            let arr = divideBoxIntoColumns(data.data.length,show);
            setBoxLength(arr)
            setData(data);
      });


      axios.get('get-lowest-year')
      .then((res) => {
            let {year} = res.data;
            setMyMin(year);
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
    {'label':'Mixed Media','value':6},
    {'label':"Photography",'value':3},
    {'label':"Painting",'value':1},
    {'label':"all",'value':0}
  ];

  
  function finishSlider(){
    console.log('finished')
  }

  function handlePagination(e,page){
    if(e)
      e.preventDefault();   
      setTimeout(() => {
        axios.get("artworks-paginated?limit=16&keyword="+search+"&year_from="+filterYear[0]+"&year_to="+filterYear[1]+"&categories="+filterType+"&page="+page)
        .then((res) => {
              let data = res.data;
              setData(data);
              let arr = divideBoxIntoColumns(data.data.length,show);
              setBoxLength(arr)
        }); 
      }, 100);
     
  }

  useEffect(function(){
    handlePagination(null,1);
  },[filterType])

  function divideBoxIntoColumns(boxWidth,columns) {
    const columnWidth = Math.floor(boxWidth / columns);
    const remainder = boxWidth % columns;
    return [columnWidth + (remainder > 0 ? 1 : 0), columnWidth + (remainder > 1 ? 1 : 0), columnWidth + (remainder > 2 ? 1 : 0), columnWidth];
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
              return <li className={filterType == item.value ? "active" : ""} onClick={(e) => {setFilterType(item.value);}}>{item.label}</li>
          })}       
        </ul>
      </div>
      <div className="searchBox searchTitle">
        <button className="search" onClick={handlePagination}></button>
        <input className="search" value={search}
                  onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
      </div>
      <div className="searchBox searchYears">
        <RangeSlider
                value={filterYear}
                setValue={setFilterYear}                          
                min={myMin}
                max={2023}
              ></RangeSlider>
      </div>
      <div className="searchBox searchPrice">
          <input placeholder="price" />
      </div>
      <div className="searchBox clear"><button onClick={(e) => {handlePagination(e)}}>SEARCH</button>
      </div>
    </div>
    <div className="row shopG" ref={myGrid} >
            <div className='col-6 col-lg-3'>



              {data.data && boxLength.hasOwnProperty(0) && <ProductBlock
                    start={0}
                    limit={boxLength[0]}
                    data={data.data}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {data.data && boxLength.hasOwnProperty(1) && <ProductBlock
                    start={boxLength[0]}
                    limit={boxLength[1]}
                    data={data.data}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {data.data && boxLength.hasOwnProperty(2) && <ProductBlock
                    start={boxLength[1]+boxLength[0]}
                    limit={boxLength[2]}
                    data={data.data}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {data.data && boxLength.hasOwnProperty(3) && <ProductBlock
                    start={boxLength[2] + +boxLength[1] + +boxLength[0]}
                    limit={boxLength[3]}
                    data={data.data}
                    /> }
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
