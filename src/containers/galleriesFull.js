import React, {useRef,useState,useEffect} from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import Carousel from 'react-bootstrap/Carousel';
import instagram from "../assets/images/instagram.svg";
import facebook from "../assets/images/facebook.svg";
import twitter from "../assets/images/twitter.svg";
import exhibition from "../assets/images/exhibition.png";
import ProductBlock from "../components/shared/ProductBlock";
import { MetaTags } from "react-meta-tags";
import axios from '../lib/axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

function GalleriesFull(props) {
  const myGrid = useRef(null);
  const [filter, setFilter] = React.useState(false);

  function divideBoxIntoColumns(boxWidth,columns) {
    const columnWidth = Math.floor(boxWidth / columns);
    const remainder = boxWidth % columns;
    return [columnWidth + (remainder > 0 ? 1 : 0), columnWidth + (remainder > 1 ? 1 : 0), columnWidth + (remainder > 2 ? 1 : 0), columnWidth];
  }

  const [boxLength, setBoxLength] = useState([]);
  const [show, setShow] = useState(4); 
  const [artworks, setArtworks] = useState({'slider_images':[]});

  useEffect(function(){
    axios.get("galleries/"+props.match.params.index)
        .then((res) => {         
            console.log(res.data);      
              setArtworks(res.data);
              let arr = divideBoxIntoColumns(res.data.artworks.length,show);
              setBoxLength(arr)
        });   
  },[])


  return (

    <section className="galleryShow ">
    <MetaTags>
        <title>Art Galleries on Ria Bid</title>
        <meta
          name="description"
          content="Browse digital galleries.Travel digital art."
        />
        <meta
          name="keywords"
          content="art gallery, art online, galleries, sell art, decorative art,Discover Contemporary Artists, contemporary artists from Georgia,georgian contemporary artists,"
        />
      </MetaTags>
        {artworks &&
        <Carousel>
          {artworks?.slider_images.map(item =>{
            return <Carousel.Item>
            <img src={item} className="w-100"/>
          </Carousel.Item>
          })}          
        </Carousel>}
    
      <div className="row fullgaller">
        <div className="col-md-5 flex flexDir">
          {artworks && artworks?.collection_name && <h1>{artworks?.collection_name}</h1>}
          <div className="align-items-end noMobile">
            <ul className="socials">
                        {artworks && artworks?.instagram_link && <li><a target="_BLANK" href={artworks?.instagram_link}><img src={instagram}/></a></li>}
                        {artworks &&  artworks?.facebook_link && <li><a target="_BLANK" href={artworks?.facebook_link}><img src={facebook}/></a></li>}
                        {artworks && artworks?.twitter_link && <li><a target="_BLANK" href={artworks?.twitter_link}><img src={twitter}/></a></li>}
            </ul>
            {artworks && artworks?.website && <a href={artworks?.website} className="link">{artworks?.website}</a>}
          </div>
        </div>
        <div className="offset-1 col-11 offset-md-0 col-md-5 text">
          {artworks && ReactHtmlParser(artworks?.description)}
        </div>
        <div className="col-12 mobileView">
          <ul className="socials">
          {artworks && artworks?.instagram && <li><a target="_BLANK" href={artworks?.instagram}><img src={instagram}/></a></li>}
                        {artworks &&  artworks?.facebook && <li><a target="_BLANK" href={artworks?.facebook}><img src={facebook}/></a></li>}
                        {artworks && artworks?.twitter && <li><a target="_BLANK" href={artworks?.twitter}><img src={twitter}/></a></li>}
            </ul>
            {artworks && artworks?.website && <a href={artworks?.website} className="link">{artworks?.website}</a>}
        </div>

      </div>
      <div className="row exhibition">
        <div className="offset-md-1 col-md-3 flex order-2 order-md-1 broch">
          <div>
            {artworks && artworks?.collection_title && <h1>{artworks?.collection_title}</h1>}
            {artworks && artworks?.date && <p>{artworks?.date}</p>}
            {artworks && artworks?.address && <p>{artworks?.address}</p>}
      

          <div className="text">
          {artworks && ReactHtmlParser(artworks?.description_2)}
          </div>
          </div>

          {artworks && <a target="_BLANK" href={artworks?.file} className="link align-items-end">pdf brochure</a>}
        </div>
        <div className="offset-1 col-10 col-md-6 position-relative order-1 order-md-2">
          <img src={artworks.image} className="w-100"/>
          <div className="cap">
          {artworks && artworks?.author && <p><span className="title">{artworks?.author}</span></p>}
          {artworks && artworks?.category && <p><span className="cat">{artworks?.category}</span></p>}
          
          {artworks && artworks?.year && <p><span className="year">{artworks?.year}</span></p>}
       
          </div>
        </div>
      </div>
      <div className='row curatedArtworks' >
                <h1 className="curatedArtworks">curated artworks</h1>

            <div className='col-6 col-lg-3'>



              {artworks.artworks && boxLength.hasOwnProperty(0) && <ProductBlock
                    start={0}
                    limit={boxLength[0]}
                    data={artworks.artworks}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {artworks.artworks && boxLength.hasOwnProperty(1) && <ProductBlock
                    start={boxLength[0]}
                    limit={boxLength[1]}
                    data={artworks.artworks}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {artworks.artworks && boxLength.hasOwnProperty(2) && <ProductBlock
                    start={boxLength[1]+boxLength[0]}
                    limit={boxLength[2]}
                    data={artworks.artworks}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {artworks.artworks && boxLength.hasOwnProperty(3) && <ProductBlock
                    start={boxLength[2] + +boxLength[1] + +boxLength[0]}
                    limit={boxLength[3]}
                    data={artworks.artworks}
                    /> }
            </div>

            </div>
      <section >
   
      </section>
    </section>
  );
}

export default GalleriesFull;
