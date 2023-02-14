import React, {useEffect, useState, useLayoutEffect} from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import cardImg from "../assets/dummy/cardImage.jpg";
import { Link } from "react-router-dom";
import SharedSlider from "../components/shared/SharedSlider";
import { QueryClient, useQuery } from "react-query";
import { getAuctions } from "../services/auctionsService";
import { getArtworks } from "../services/artistsService";
import Loading from "./loading";
import styles from '../styles/artistfull.module.scss'

import { getBiography } from "../services/dashboardService";

const queryClient = new QueryClient();

function ArtistsFull(props) {
  const [filter, setFilter] = React.useState(false);
  const [extended, setExtended] = React.useState(false);
  const [showButtons, setShowButtons] = React.useState(true);

  const [bioData, setBioData] = useState(null);
  const [bioError, setBioError] = useState(null);
  const [bioLoading, setBioLoading] = useState(false);


  const descEl = React.useRef(null);
 
  const { isLoading, error, data } = useQuery(
    "artist",
    () => getArtworks(props.match.params.index),
    {
      refetchOnWindowFocus: false,
    }
  );

  const selected_just_for_you = data


  useEffect(()=>{
    setBioLoading(true)
    getBiography(props.match.params.index)
      .then((res)=> {
        setBioLoading(false)
        setBioData(res)
      })
      .catch((err)=> {
        setBioLoading(false)
        setBioError(err)
      });
  }, []);

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  let bioImage = '';
  let bioName = '';
  let bioDescription = '';
  if (bioData && bioData.data) {
    bioImage = bioData.data.image;
    bioName = bioData.data.artist_name
    bioDescription = bioData.data.description;
    // console.log(bioDescription.length)
    // if (bioDescription.length > 150) {
    //   console.log(descEl.current.style)
    // }
  }

  const _extend = () => {
    setExtended(true);
    console.log(descEl.current.style);
    descEl.current.style.height = "min-content";
  }
  const _collapse = () => {
    setExtended(false)
    descEl.current.style.height = "140px";
  }

  return (
    <div>
    <section id="shop" className="container">
      <ul className="breadcrumb">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/auctions">Artist</Link>
        </li>
        <li>{data?.data[0]?.display_name}</li>
      </ul>

      {bioData && bioData.data && !bioError && !bioLoading &&
        <div className={styles.bioContainer}>

          <h1 className={styles.nameMobile}>{bioName}</h1>
          <img src={bioImage} className={styles.bioImage}/>
          <div className={styles.textContainer}>
            <h1 className={styles.nameDesktop}>{bioName}</h1>
            <div className={styles.label}>Bio: </div>
            <div ref={descEl} className={styles.description}>
              {bioDescription}
              {!extended && <div className={styles.gradient}></div>}
            </div>
          </div>
      
        </div>
      }

    </section>
          
    <div className="grid-container-auctions inbio">


{data.data.length ? (
  <SharedSlider
    slidesToShow={4}
    data={selected_just_for_you.data}
    link="/"
    title={"ALL WORKS BY "+bioName}
  />
) : (
  <h2>There are no artworks for current artist</h2>
)}
</div>
    </div>
  );
}

export default ArtistsFull;
