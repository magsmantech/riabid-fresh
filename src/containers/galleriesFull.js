import React, {useRef} from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import cardImg from "../assets/dummy/gallery-dummy.png";
import cardImg2 from "../assets/dummy/gallery-dummy2.png";
import ProductBlock from "../components/shared/ProductBlock";
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";
import { getGallery } from "../services/galleriesService";
import { useQuery } from "react-query";
import Loading from "./loading";

function GalleriesFull(props) {
  const myGrid = useRef(null);
  const [filter, setFilter] = React.useState(false);
  const { isLoading, error, data } = useQuery(
    "gallery",
    () => getGallery(props.match.params.index),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  const { gallery_title, location, legal_image, id, gallery_description } =
    data.data.gallery;
  return (

    <section className="galleryShow paddingLeft">
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
      <div className="fullgaller">
        <div className='titlePage'>
          <h1>{gallery_title}</h1>
            <div className="pictures">
             <img className="galPic" src={legal_image}></img>
          </div>
        </div>
      
        <div className="text">        
          <p>{gallery_description}</p>
          <p className="location">{location}</p>
        </div>
      </div>
      <section >
        <h1 className="galleryArtworks">gallery artworks</h1>
      <div className="row" ref={myGrid} >
            <div className='col-md-3'>
            {data.data.artworks ? (
                    <ProductBlock
                    start={0}
                    limit={2}
                    data={data.data.artworks}
                    />
                    ) : null}
            </div>
            <div className='col-md-3'>
            {data.data.artworks ? (
                    <ProductBlock
                    start={2}
                    limit={2}
                    data={data.data.artworks}
                    />
                    ) : null}
            </div>
            <div className='col-md-3'>
            {data.data.artworks ? (
                    <ProductBlock
                    start={4}
                    limit={2}
                    data={data.data.artworks}
                    />
                    ) : null}
            </div>
            <div className='col-md-3'>
            {data.data.artworks ? (
                    <ProductBlock
                    start={6}
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

export default GalleriesFull;
