import React from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import cardImg from "../assets/dummy/gallery.png";
import { Link } from "react-router-dom";
import { getGalleries } from "../services/galleriesService";
import { useQuery } from "react-query";
import Loading from "./loading";
import { MetaTags } from "react-meta-tags";

function Galleries(props) {
  const [filter, setFilter] = React.useState(false);
  const { isLoading, error, data } = useQuery("galleries", getGalleries, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className='paddingLeft'>
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
   
      <div className="galleryPage">
        {data.data
          .filter((item) => item.is_hidden === 0)
          .map((item) => (
            <div key={item.id} className="galleryItem">
            
                <p className="title">{item.gallery_title}</p>
           
                <div className="text">
                  <div className='justify-content-center'>
                    <p className="desc">{item.gallery_description}</p>
                    <p className="location">{item.location}</p>
                  </div>
                </div>
                <Link to={"/galleries/" + item.id}>
                  <button className="custom-button">VIEW GALLERY</button>
                </Link>
             
            </div>
          ))}
        {data.data.filter((item) => item.is_hidden === 0).length === 0
          ? "There are no galleries yet"
          : null}
      </div>
    </section>
  );
}

export default Galleries;
