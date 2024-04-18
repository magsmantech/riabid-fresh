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
        

        <div className="row">
          <div className="col-md-4 leftD  order-2 order-md-1">
            <div>
            {artworks && artworks?.collection_name && <h1>{artworks?.collection_name}</h1>}


          <div className="text">
            {artworks && ReactHtmlParser(artworks?.description)}
          </div></div>

          <div className="row mobPad">
            <div className="col-6">
              <div className="bottomBorder">
              {artworks.logo && <img src={artworks.logo} className="img"/>}
               {artworks && artworks?.address && <p>{artworks?.address}</p>}
               </div>
            </div>
            <div className="col-6">
              <div className='bottomBorder'>
              {artworks?.instagram_link || artworks?.facebook_link || artworks?.twitter_link && (<ul className="socials">
                          {artworks?.instagram_link && <li><a target="_BLANK" href={artworks?.instagram_link}><img src={instagram}/></a></li>}
                          {artworks?.facebook_link && <li><a target="_BLANK" href={artworks?.facebook_link}><img src={facebook}/></a></li>}
                          {artworks?.twitter_link && <li><a target="_BLANK" href={artworks?.twitter_link}><img src={twitter}/></a></li>}
              </ul>)}
              {artworks && artworks?.website && <a href={"https://"+artworks?.website} className="link">{artworks?.website}</a>}
              </div>
            </div>
          </div>

          </div>
          <div className="col-md-8 order-1 order-md-2">
          {artworks &&
        <Carousel>
            {artworks?.slider_images.map(item =>{
              return <Carousel.Item>
              <img src={item} className="w-100"/>
            </Carousel.Item>
            })}          
          </Carousel>}
          </div>
        </div>
    
 
      <div className='row galleryArtworks' >
                <h1 >gallery artworks</h1>

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
