import React, { useEffect, useState, useRef } from "react";

import {
  getArtworks,
  getArtworksNew,
  getArtworksRecomended,
} from "../services/artworksService";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "./loading";
import sold from "../assets/sold.png";
import RangeSlider from "../components/shared/RangeSlider";
import ScrollToTopOnMount from "../components/shared/ScrollToTop";
import Pagination from "./Pagination";
import { FaStar } from "react-icons/fa";
import { getCollection } from "../services/collectionService";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { MetaTags } from "react-meta-tags";
import ProductBlock from "../components/shared/ProductBlock";

function Collection(props) {
  const categories = [
    "Painting",
    "Sculpture",
    "Photography",
    "Print",
    "Drawing, Collage or other Work on Paper",
    "Mixed Media",
    "Performance Art",
    "Installation",
    "Video/Film/Animation",
    "Architecture",
    "Fashion Design and Wearable Art",
    "Jewelry",
    "Design/Decorative Art",
    "Textile Arts",
    "Other",
  ];
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const myGrid = useRef(null);
  const { isLoading, error, data } = useQuery(
    "collection" + props.match.params.id,
    () => getCollection(props.match.params.id),
    {
      refetchOnWindowFocus: false,
    }
  );

  const [filterType, setFilterType] = useState("");
  const [categoryType, setCategoryType] = useState([]);
  const [filterPrice, setFilterPrice] = React.useState([0, 1000000]);
  const [filterYear, setFilterYear] = useState([0, 9999]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  const getPrivilegedIcon = (privileged) =>
    privileged ? (
      <FaStar
        size="20px"
        style={{
          position: "absolute",
          top: "-20px",
          right: "20px",
          color: "#fcba03",
          zIndex: 5,
        }}
      />
    ) : null;

  return (
    <section className="galleryShow paddingLeft">
     <MetaTags>
        <title>Art Collection on Ria Bid</title>
        <meta
          name="description"
          content="Browse digital galleries.Travel digital art."
        />
        <meta
          name="keywords"
          content="art gallery, art online, galleries, sell art, decorative art,Discover Contemporary Artists, contemporary artists from Georgia,georgian contemporary artists,"
        />
      </MetaTags>
      <div className="fullgaller">
        <div className='titlePage'>
          <h1>{data.data.collection_name}</h1>
            <div className="pictures">
             <img className="galPic" src={data.data.image}></img>
          </div>
        </div>
      
        <div className="text">        
          <p>{ReactHtmlParser(data.data.description)}</p>
        </div>
      </div>

      <section >
        <h1 className="galleryArtworks">collection artworks</h1>
      <div className="row" ref={myGrid} >
            <div className='col-md-4'>
            {data.data.artworks ? (
                    <ProductBlock
                    start={0}
                    limit={2}
                    data={data.data.artworks}
                    />
                    ) : null}
            </div>
            <div className='col-md-4'>
            {data.data.artworks ? (
                    <ProductBlock
                    start={2}
                    limit={2}
                    data={data.data.artworks}
                    />
                    ) : null}
            </div>
            <div className='col-md-4'>
            {data.data.artworks ? (
                    <ProductBlock
                    start={4}
                    limit={2}
                    data={data.data.artworks}
                    />
                    ) : null}
            </div>
       
        </div>
      </section>
    </section>
  );
}

export default Collection;
