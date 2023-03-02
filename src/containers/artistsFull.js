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
import axios from '../lib/axios';
import { getBiography } from "../services/dashboardService";

const queryClient = new QueryClient();

function ArtistsFull(props) {
  const myGrid = React.useRef(null);
  const [data, setData] = React.useState(false);
  const [filter, setFilter] = React.useState(false);
  const [extended, setExtended] = React.useState(false);
  const [showButtons, setShowButtons] = React.useState(true);

  const [bioData, setBioData] = useState(null);
  const [bioError, setBioError] = useState(null);
  const [bioLoading, setBioLoading] = useState(false);


  const descEl = React.useRef(null);
 

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

  function handlePagination(e,page){
    e.preventDefault();   
        axios.get("artists/artworks-paginated/"+props.match.params.index+"/?limit=6&page="+page)
          .then((res) => {
                let data = res.data;
                setData(data);
          });
  }

  useEffect(function(){
    axios.get('artists/artworks-paginated/'+props.match.params.index+'/?limit=6')
      .then((res) => {
            let data = res.data;
            setData(data);
      });
  },[])


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

      <div className="row" ref={myGrid} >

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


        
        <div className="row productPaginate">
                <div className='col-4 prevPage'>
                    <a to="#" onClick={e => { if(data.current_page -1 < data.last_page && data.current_page -1 != 0 ){  handlePagination(e,data.current_page-1);} myGrid.current.scrollIntoView({behavior: 'smooth', block: 'center'}) }}>PREV</a>
                </div>
                <div className='col-4 centerPage'>

                </div>
                <div className='col-4 nextPage'>
                <a to="#" onClick={e => { if(data.current_page +1 < data.last_page){ handlePagination(e,data.current_page+1); } myGrid.current.scrollIntoView({behavior: 'smooth'})}}>NEXT</a>
                </div>
            </div>

      </div>
    </div>
  );
}

export default ArtistsFull;
