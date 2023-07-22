import React, {useRef,useState,useEffect} from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import Carousel from 'react-bootstrap/Carousel';
import instagram from "../assets/images/instagram.svg";
import facebook from "../assets/images/facebook.svg";
import twitter from "../assets/images/twitter.svg";
import cardImg2 from "../assets/images/galleryImage.png";
import exhibition from "../assets/images/exhibition.png";
import ProductBlock from "../components/shared/ProductBlock";
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";
import { getGallery } from "../services/galleriesService";
import { useQuery } from "react-query";
import Loading from "./loading";
import axios from '../lib/axios';

function GalleriesFull_html(props) {
  const myGrid = useRef(null);
  const [filter, setFilter] = React.useState(false);
  const { isLoading, error, data } = useQuery(
    "gallery",
    () => getGallery(props.match.params.index),
    {
      refetchOnWindowFocus: false,
    }
  );
  function divideBoxIntoColumns(boxWidth,columns) {
    const columnWidth = Math.floor(boxWidth / columns);
    const remainder = boxWidth % columns;
    return [columnWidth + (remainder > 0 ? 1 : 0), columnWidth + (remainder > 1 ? 1 : 0), columnWidth + (remainder > 2 ? 1 : 0), columnWidth];
  }



  const [boxLength, setBoxLength] = useState([]);
  const [show, setShow] = useState(4); 
  const [artworks, setArtworks] = useState({'data':[]});

  useEffect(function(){
    axios.get("artworks-paginated?limit=16")
        .then((res) => {
              let addon_data = res.data;
            
              addon_data['data'] = [...addon_data.data];       
              
              setArtworks(addon_data);
              let arr = divideBoxIntoColumns(addon_data.data.length,show);
              setBoxLength(arr)
        });   
  },[])

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

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
      
        <Carousel>
          <Carousel.Item>
                  <img src={cardImg2} className="w-100"/>
          </Carousel.Item>
          <Carousel.Item>
          <img src={cardImg2} className="w-100"/>
          </Carousel.Item>
        </Carousel>
    
      <div className="row fullgaller">
        <div className="col-md-5 flex flexDir">
          <h1>RK Foundation</h1>
          <div className="align-items-end noMobile">
            <ul className="socials">
                              <li><a href="#"><img src={instagram}/></a></li>
                              <li><a href="#"><img src={facebook}/></a></li>
                              <li><a href="#"><img src={twitter}/></a></li>
            </ul>
            <a href="#" className="link">riakeburia.com</a>
          </div>
        </div>
        <div className="offset-1 col-11 offset-md-0 col-md-5 text">
        <p>The Ria Keburia Foundation, founded in 2018 by the Georgian patron of the arts Ria Keburia, aims to support development of contemporary art scene in Georgia and South Caucasus. By raising awareness of various global art processes, the Foundation creates intercultural contexts and brings together a diverse community of arts professionals.</p><br /><p>
Through the generous support of its sponsors the Foundation is striving to create a multifaceted and enriching model of collaboration between various galleries, institutions, residency programs, and platforms.</p>
        </div>
        <div className="col-12 mobileView">
          <ul className="socials">
                              <li><a href="#"><img src={instagram}/></a></li>
                              <li><a href="#"><img src={facebook}/></a></li>
                              <li><a href="#"><img src={twitter}/></a></li>
            </ul>
            <a href="#" className="link">riakeburia.com</a>
        </div>

      </div>
      <div className="row exhibition">
        <div className="offset-md-1 col-md-3 flex order-2 order-md-1 broch">
          <div>
            <h1>Current show exhibition: Partick Meagher</h1>
            <p>06 jun 23 – 15 jun 23</p>
            <p>5 Besiki Street , Tbilisi 0108</p>
      

          <div className="text">
          Lorem ipsum dolor sit amet consectetur. Hac feugiat magna sit ac sagittis blandit mauris bibendum urna. Scelerisque sem vestibulum eget lobortis. Venenatis ut laoreet a sit velit. Et at egestas id purus ante amet. Vitae sed urna nisi lacus ornare nisl. Tortor ornare at bibendum pretium mattis ullamcorper est. Adipiscing at vitae interdum odio pellentesque quam purus lectus. Enim risus nisl tincidunt iaculis. Amet.
          </div>
          </div>

          <a href="#" className="link align-items-end">pdf brochure</a>
        </div>
        <div className="offset-1 col-10 col-md-6 position-relative order-1 order-md-2">
          <img src={exhibition} className="w-100"/>
          <div className="cap">
            <span className="title">Keti Shapatava</span>
            <span className="cat">Lighthouse</span>
            <span className="year">2022</span>
          </div>
        </div>
      </div>
      <div className='row curatedArtworks' >
                <h1>curated artworks</h1>

            <div className='col-6 col-lg-3'>



              {artworks.data && boxLength.hasOwnProperty(0) && <ProductBlock
                    start={0}
                    limit={boxLength[0]}
                    data={artworks.data}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {artworks.data && boxLength.hasOwnProperty(1) && <ProductBlock
                    start={boxLength[0]}
                    limit={boxLength[1]}
                    data={artworks.data}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {artworks.data && boxLength.hasOwnProperty(2) && <ProductBlock
                    start={boxLength[1]+boxLength[0]}
                    limit={boxLength[2]}
                    data={artworks.data}
                    /> }
            </div>
            <div className='col-6 col-lg-3'>
            {artworks.data && boxLength.hasOwnProperty(3) && <ProductBlock
                    start={boxLength[2] + +boxLength[1] + +boxLength[0]}
                    limit={boxLength[3]}
                    data={artworks.data}
                    /> }
            </div>

            </div>
      <section >
   
      </section>
    </section>
  );
}

export default GalleriesFull_html;
