import React, { useState } from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import { useQuery } from "react-query";
import { getArtists } from "../services/artistsService";
import { Link } from "react-router-dom";
import Loading from "./loading";
import queryString from "query-string";
import { MetaTags } from "react-meta-tags";

import { FaStar } from 'react-icons/fa'
 
function Artists(props) {
  const [filter, setFilter] = useState(false);
  const [alpha, setAlpha] = useState(false);
  

  const [search, setSearch] = useState("");
  const { isLoading, error, data } = useQuery("artists", getArtists, {
    refetchOnWindowFocus: false,
  });

  function handleChange(event) {
    setSearch(event.target.value);
  }
  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  let formatted_data = data.data.filter((item) => item.display_name.toLowerCase().includes(search.toLowerCase()) || search == "").reduce((r, e) => {
    // get first letter of name of current element

    let group = e.display_name[0];
    // if there is no property in accumulator with this letter create it
    if (!r[group]) r[group] = { group, children: [e] };
    // if there is push current element to children array for that letter
    else r[group].children.push(e);
    // return accumulator
    return r;
  }, {});

  const new_array = [];
  console.log(Object.keys(formatted_data))
  const filtered = Object.keys(formatted_data)
    .reduce((obj, key) => {
      obj[key] = formatted_data[key];
      new_array.push(obj[key]);
      return obj;
    }, {});

    let sortData = new_array.sort((a, b) => (a.group < b.group ? -1 : 1))

   let length = data.data.length; // 207
   let group_length = sortData.length; // 24

   let row = [[],[],[],[],[],[]];
   let i = 0;
   let max = length / 6;
   let already_length =0;
   sortData.map(item => {  

    row[i].push(item);
    already_length += item.children.length;
    if(already_length >= max){
      i+=1;
      already_length = 0;
    }
   });
  return (
    <>
    
    <h1 className="pageHeading">Artists</h1>
    <div className="searchFArtist">
      <button className="search"></button>
      <input className="search"  onKeyUp={handleChange} placeholder="Search" />
    </div>
    <section className="artistsPage">
      <MetaTags>
        <title>ARTISTS: Browse Artists | Contemporary Georgian artists</title>
        <meta
          name="description"
          content="Explore artists on riabid. Browse Modern and Contemporary Georgian artist pages that include artworks for sale, art auction results."
        />
        <meta
          name="keywords"
          content="Georgian painters,Georgia contemporary art, designer,  decorative art,Discover Contemporary Artists, Georgia's Contemporary Artists, artists from Tbilisi,contemporary artists from Georgia,Georgian artist works,"
        />
      </MetaTags>
      <div className="row">
          {row.map((item) => (
              <div className="col-2">
                 {item.map((key) => (
                   <div key={key.group} className="group">              
                  {formatted_data[key.group].children.map((item) =>
                    (
                      <Link
                        key={item.id}
                        to={"/artists/" + item.id}
                        className="artist"
                      >
                        {item.display_name}
                        <br></br>
                      </Link>
                    )
                  )}
                </div> ))}
              </div>
          ))}
      </div>
    </section></>
  );
}

export default Artists;
