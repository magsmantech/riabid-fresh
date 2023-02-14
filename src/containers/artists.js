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
  

  const [letter, setLetter] = useState("");
  const { isLoading, error, data } = useQuery("artists", getArtists, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  let formatted_data = data.data.reduce((r, e) => {
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
  const filtered = Object.keys(formatted_data)
    .filter((key) => key == letter || letter == "")
    .reduce((obj, key) => {
      obj[key] = formatted_data[key];
      new_array.push(obj[key]);
      return obj;
    }, {});

    let sortData = new_array.sort((a, b) => (a.group < b.group ? -1 : 1))

   
  
  const getPrivilegedIcon = (privileged) => (
    privileged ? ( 
    // <img src={Star} alt="privileged-icon" style={{
    //   width: '20px',
    //   height: '20px',
    //   position: 'absolute',
    //   zIndex: 5,
    //   right: '10px',
    //   top: '-10px'
    // }}></img> ) : 
    <FaStar size="20px" style={{
      position: "absolute", top: '50%', left: '-25px', color: "#fcba03", zIndex: 5,
      transform: 'translateY(-50%)',
    }}/>) : 
    null
  )
  return (
    <section id="shop" className="container">
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
      <div className="contact-container">
        <div className="bread" style={{ gridArea: "beard" }}>
          {/* home / shop */}
        </div>
        <div className="letters flex">
          {letter == "" ? (
            <button className="letter active">ALL</button>
          ) : (
            <button onClick={() => setLetter("")} className="letter">
              ALL
            </button>
          )}
          {sortData.map((key) =>
            letter == key.group ? (
              <button className="letter active">{key.group}</button>
            ) : (
              <button
                key={key.group}
                onClick={() => setLetter(key.group)}
                className="letter"
              >
                {key.group}
              </button>
            )
          )}
        </div>
        <div className="artist-container">
          {sortData.map((key) => (
            <div key={key.group}>
              <p key={key.group} className="letter">
                {key.group}
              </p>
              {formatted_data[key.group].children.map((item) =>
                (
                  <Link
                    style={{ color: item.has_artwork? "#d43e3e": '#000', position: "relative" }}
                    key={item.id}
                    to={"/artists/" + item.id}
                    className="artist"
                  >
                    {item.display_name}
                    {getPrivilegedIcon(item.privileged)}
                    <br></br>
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Artists;
