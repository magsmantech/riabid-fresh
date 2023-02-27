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
import ProductBlock from "../components/shared/ProductBlock";

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

  }

  return (
    <div>
    <section className="artistFullPage">
 

      {bioData && bioData.data && !bioError && !bioLoading &&
        <div className="bio">

          <h1 className="name">{bioName}</h1>
          <div className="bioText">        
            <div ref={descEl} >
              {bioDescription}
            </div>
          </div>

          <img src={bioImage} className="bioImg"/>
         
      
        </div>
      }

    </section>
          
      <div className="ibioArtworks">

      <h2>artworks</h2>

      <div className="row" >

            <div className='col-4'>

            {data.data ? (
                    <ProductBlock
                    start={0}
                    limit={2}
                    data={data.data}
                    />
                    ) : null}

            </div>
            
            <div className='col-4'>

            {data.data ? (
                    <ProductBlock
                    start={2}
                    limit={2}
                    data={data.data}
                    />
                    ) : null}

            </div>
            
            <div className='col-4'>

            {data.data ? (
                    <ProductBlock
                    start={4}
                    limit={2}
                    data={data.data}
                    />
                    ) : null}
            </div>


        </div>

      </div>
    </div>
  );
}

export default ArtistsFull;
