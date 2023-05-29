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
  const [bioLenght, setbioLenght] = useState(200);
  const [showMore, setShowMore] = useState(false);
  const [show, setShow] = useState(3); 
  const [total, setTotal] = useState(16);
  const [boxLength, setBoxLength] = useState([]);
  const descEl = React.useRef(null);


  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize)
    return () =>{
      window.removeEventListener('resize', handleResize)
    }
  },[])

  function handleResize() {
    if(window.innerWidth > 768)
      setShow(3);
    else 
      setShow(2);
  }
 

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

  function divideBoxIntoColumns(boxWidth,columns) {
    const columnWidth = Math.floor(boxWidth / columns);
    const remainder = boxWidth % columns;
    return [columnWidth + (remainder > 0 ? 1 : 0), columnWidth + (remainder > 1 ? 1 : 0), columnWidth];
  }

  function handlePagination(e,page){
    e.preventDefault();   
        axios.get("artists/artworks-paginated/"+props.match.params.index+"/&page="+page)
          .then((res) => {
                let data = res.data;
                
                setTotal = (data.data.length%4);
                setData(data);
          });
  }

  useEffect(function(){
    axios.get('artists/artworks-paginated/'+props.match.params.index+'/')
      .then((res) => {
            let data = res.data;
            let arr = divideBoxIntoColumns(data.data.length,show);
            setBoxLength(arr)
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
 

      {bioData && bioData.data && !bioError && !bioLoading && <>
        <div className="row bio">
          <div className='col-lg-4 col-8'>
            <h1 className="name">{bioName}</h1>
          </div>
          <div className="offset-lg-1 col-lg-4 smallHide">
          <div className="bioText ">        
            <div ref={descEl} >
              {bioDescription &&   <div dangerouslySetInnerHTML={{__html: bioDescription}}></div>}
            </div>
          </div>
          </div>
          <div className='offset-lg-1 col-lg-1 col-4'>
          {bioImage && <img src={bioImage} className="bioImg"/>}
          </div>
      
        </div>

      <div className="bioText fullWidth">        
        <div className={showMore ? 'hidden' : ""}>
          {bioDescription && bioDescription.length > bioLenght ? bioDescription.substring(0,bioLenght).replace(/(<([^>]+)>)/gi, "")+'...' : bioDescription.replace(/(<([^>]+)>)/gi, "")}
        </div>

        <div className={showMore ? 'active' : 'hidden'}>
          <div dangerouslySetInnerHTML={{__html: bioDescription}}></div>
        </div>
        {bioDescription && bioDescription.length > bioLenght ? <button className={!showMore ? "showMore" : "showMore hidden"} onClick={(e)=>{setShowMore(!showMore)}}>Learn More</button> : ""}
      </div></>
      }

    </section>
          
      <div className="ibioArtworks">

      <h2>artworks</h2>

      <div className="row" ref={myGrid} >

      <div className='col-12 forMobileBigArt'>
                    {data.data ? (
                    <ProductBlock
                    start={0}
                    limit={1}
                    data={data.data}
                    />
                    ) : null}
                             
            </div>

            <div className='col-6 col-md-4'>
                    {data.data && boxLength.hasOwnProperty(0) && <ProductBlock
                    start={show == 2 ? 1 : 0}
                    limit={boxLength[0]}
                    data={data.data}
                    /> }
            </div>
            
            <div className='col-6 col-md-4'>
              {data.data && boxLength.hasOwnProperty(0) && <ProductBlock
                    start={show == 2 ? boxLength[0]+1 : boxLength[0]}
                    limit={boxLength[1]}
                    data={data.data}
                    /> }
            </div>
            
            <div className='hideLast col-md-4'>
              {data.data && boxLength.hasOwnProperty(0) && <ProductBlock
                    start={boxLength[0]+boxLength[1]}
                    limit={boxLength[2]}
                    data={data.data}
                    /> }
            </div>


        </div>


        
        {/* <div className="row productPaginate">
                <div className='col-4 prevPage'>
                    <a to="#" onClick={e => { if(data.current_page -1 < data.last_page && data.current_page -1 != 0 ){  handlePagination(e,data.current_page-1);} myGrid.current.scrollIntoView({behavior: 'smooth', block: 'center'}) }}>PREV</a>
                </div>
                <div className='col-4 centerPage'>

                </div>
                <div className='col-4 nextPage'>
                <a to="#" onClick={e => { if(data.current_page +1 < data.last_page){ handlePagination(e,data.current_page+1); } myGrid.current.scrollIntoView({behavior: 'smooth'})}}>NEXT</a>
                </div>
            </div> */}

      </div>
    </div>
  );
}

export default ArtistsFull;
