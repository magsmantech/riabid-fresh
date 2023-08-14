import React, { useState, useRef } from "react";
import { getCoverImages } from "../../services/settings";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function Hero() {
  
  const coverImages = useQuery("cover-images", getCoverImages, {
    refetchOnWindowFocus: false,
  });
  const coverData = coverImages.data ? coverImages.data.data : [];
  const [height, setHeight] = useState(162);

  React.useEffect(() => {    
    setTimeout(() => {
      handleResize();
    }, 10);
    window.addEventListener('resize', handleResize)
    return () =>{
      window.removeEventListener('resize', handleResize)
    }
  },[])
  function handleResize() {
    if(window.innerWidth > 991)
      setHeight(document.getElementById('slideImg').clientHeight - document.getElementById('headingTitle').clientHeight-7);
  }
  return (
    <div className="hero-wrapper">      
       <div className="slide">
        <div className="cap">
         <h1 id='headingTitle'>{coverData.length > 0 && coverData[0].title}</h1>

          <div className="cert">
            <Link to="/text" className='certificate' style={{height:height}}>
              <span className='icon'></span>
              <span className='text'>Certificate of Authenticity applied on Recommended Artworks</span>

              <span className="learnMore">Learn More</span>
            </Link>

            <Link to="/delivery" className='delivery' style={{height:height}}>
              <span className='icon'></span>
              <span className='text'>Fast Delivery from 5-7 days by Georgian Post</span>
              <span className="learnMore">Learn More</span>
            </Link>
          </div>
        </div>
        <div className="img">
          <a href={coverData.length > 0 && coverData[0].link}><img src={coverData.length > 0 && coverData[0].image_link} id="slideImg"/></a>

        {coverData.length > 0 && 
          <div className="author">
            <p>{coverData[0].author}</p>
            <p>{coverData[0].category}</p>
            <p>{coverData[0].year}</p>
          </div> }
        </div>
      </div>
    </div>
  );
}

export default Hero;
