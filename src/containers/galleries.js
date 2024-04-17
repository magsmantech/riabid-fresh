import React from "react";
import { Link } from "react-router-dom";
import { getGalleries } from "../services/galleriesService";
import { useQuery } from "react-query";
import Loading from "./loading";
import { MetaTags } from "react-meta-tags";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

function Galleries(props) {
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

        <div className="row galleryDesc">
          <div className="col-md-8">
            <h1>Galleries</h1>
            <p className="desktopText">Our team is excited to announce a new annual subscription option for the local and international galleries! Enjoy full access to the Georgian art scene. Become a devoted member of Ria Keburia Foundation and get the best privileges for your Gallery. Sell, share, admire Georgian art on Ria Bid! </p>
            <p className="mobileText">Artsy also follows a typical profit-based model in terms of its pricing. Artists can get set up for free, but after that they pay a monthly fee of $425 for the privilege of being represented on the platform. What's more, Artsy collects a 10% commission on each sale made through the platform.</p>
          </div>
          <div className="col-md-4 subSide">
              <div>
                <h2 className="desktopSub">Subscription</h2>
                <h2 className="mobileSub">Become a member</h2>
                <p>Gallery Subscription on RIABID charity auction platform can offer numerous benefits to galleries,artists, art enthusiasts, and collectors.</p>
              </div>
              <Link to='/subscribe'>SUBSCRIBE</Link>
          </div>
        </div>
        
        <div className="row">{data.data
          .map((item) => (
            <div key={item.id} className="col-md-4 galleryItem">
                <div>
                  <img src={item.image} />
                  <p className="title">{item.collection_name}</p>
                  <p className="desc">{item && ReactHtmlParser(item?.description)}</p>
                </div>
                <div className="text">
                    <div className="row">
                      <div className="col-6">
                           {item.date && <p className="date">{item.date}</p>}
                          <p className="location">{item.address}</p>     
                        </div>
                      <div className="col-6">
                      <p className="website">{item.website}</p>     
                        </div>
                    </div>
                    <Link to={"/galleries/" + item.id}>VIEW GALLERY</Link>
                </div>
                
             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Galleries;
