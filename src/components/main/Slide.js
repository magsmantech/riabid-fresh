import React,{useState} from "react";
import { Link } from "react-router-dom";


function Slide({ img, text, btn, author, action }) {
  const [height, setHeight] = useState(0);


  React.useEffect(() => {
    handleResize();
  window.addEventListener('resize', handleResize)
  })
  function handleResize() {
    setHeight(document.getElementById('slideImg').clientHeight - document.getElementById('headingTitle').clientHeight-7);
  }

  return (
    <div className="slide">
      <div className="cap">
        <h1 id="headingTitle">Unique Georgian art from emerging and leading artists</h1>

        <div className="cert">
          <Link href="#" className='certificate' style={{height:height}}>
            <span className='icon'></span>
            Certificate of Authenticity applied on Recommended Artworks

            <span className="learnMore">Learn More</span>
          </Link>

          <Link href="#" className='delivery' style={{height:height}}>
            <span className='icon'></span>
            Fast Delivery from 5-7 days by Georgian Post
            <span className="learnMore">Learn More</span>
          </Link>
        </div>
      </div>
      <div className="img">
        <img src={img} id="slideImg"/>

        <div className="author">
          <p>Keti Shapatava</p>
          <p>Lighthouse</p>
          <p>2022</p>
        </div>
      </div>
    </div>
  );
}

export default Slide;
