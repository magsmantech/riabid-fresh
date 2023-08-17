import React, { useState,useEffect,useRef,useContext } from "react";
import small from "../assets/product/small-img.png";
import main from "../assets/product/main.png";
import clock from "../assets/product/clock.png";
import favoritesIcon from "../assets/favorites.svg";
import sold from "../assets/sold.png";
import SharedSlider from "../components/shared/SharedSlider";
import { getAuction } from "../services/auctionsService";
import ReactFancyBox from "react-fancybox";
import "react-fancybox/lib/fancybox.css";
import ProductBlock from "../components/shared/ProductBlock";
import { getArtwork } from "../services/artworksService";
import Loading from "./loading";
import Carousel from 'react-bootstrap/Carousel';
import { AppContext } from './../App';

import {
  addBag,
  addComment,
  addFavorites,
  requestPrice,
} from "../services/bagService";
import { toast } from "react-toastify";
import { bidArtwork } from "../services/bidService";
import { useTimer } from 'react-timer-hook';
import { QueryClient, useMutation } from "react-query";
import { userProvider } from "../store/store";
import { useQuery, useQueryClient } from "react-query";
import { MetaTags } from "react-meta-tags";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import axios from '../lib/axios';






function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,

  } = useTimer({ expiryTimestamp});
  return (
    <div style={{textAlign: 'center'}}>
      <p className="time red">{days}d: {hours}h: {minutes}m: {seconds}s</p>
    </div>
  );
}

export default function ProductDet(props) {
  const queryClient = useQueryClient();
  const { currentUser } = userProvider();
  const [artwork, setArtwork] = React.useState({});
  const [other_work, setOther] = React.useState([]);
  const [images,setImages] = React.useState([]);
  const [shareActive, setShareActive] = useState(false);
  const [bidAmount, setBidAmount] = useState();
  const [comment, setComment] = useState("");
  const [isGift, setIsGift] = useState(0);
  const [limitColumn, setLimitColumn] = useState(2);
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  const { showMenu,setShowMenu } = useContext(AppContext)

  const onPrevClick = () => {
    console.log(ref.current);
    ref.current.prev();
  };
  const onNextClick = () => {
    ref.current.next();
  };
  const handleSelect = (selectedIndex, e) => {
    setActive(selectedIndex);
  };



  const addMutation = useMutation(addBag, {
    onMutate: (variables) => {
      if(!currentUser.isAuthenticated){
        setShowMenu(true);
      }
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error("You need to login");
    },
    onSuccess: (data, variables, context) => {
      
      
      toast.dark("Artwork added to bag", {
        progress: undefined,
        hideProgressBar: true,
      });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const requestPriceMutation = useMutation(requestPrice, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error("You need to login");
    },
    onSuccess: (data, variables, context) => {
      toast.dark("Price requested. Gallery will contact you soon.", {
        progress: undefined,
        hideProgressBar: true,
      });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const commentMutation = useMutation(addComment, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error("Error adding comment");
    },
    onSuccess: (data, variables, context) => {
      toast.dark("Comment added", {
        progress: undefined,
        hideProgressBar: true,
      });
      setComment("");
      queryClient.invalidateQueries("product");
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const favoritesMutation = useMutation(addFavorites, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error("You need to login");
    },
    onSuccess: (data, variables, context) => {
      let favorites = localStorage.getItem('favorites').split(',');

      let ind = favorites.indexOf(variables.toString());
      if(ind == -1){
        favorites.push(variables.toString());
  
      }else{
        favorites.splice(ind,1);
        localStorage.setItem('favorites',favorites);
      }
      localStorage.setItem('favorites',favorites);
      toast.dark("Artwork added to favorites", {
        progress: undefined,
        hideProgressBar: true,
      });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const bidMutation = useMutation(bidArtwork, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error("You need to login");
    },
    onSuccess: (data, variables, context) => {
      toast.dark("Successfully bid", {
        progress: undefined,
        hideProgressBar: true,
      });
      window.location.reload();
    },
    onSettled: (data, error, variables, context) => {},
  });

  useEffect(function(){
    axios.get('artworks/'+props.match.params.index)
    .then((res) => {
          let data = res.data;

          setArtwork(data.artwork);
          setImages(JSON.parse(data.artwork.images));
          axios.get('artists/artworks-paginated/'+data.artwork.artist_id+'/?limit=8')
          .then((res) => {
                let data = res.data;
                setOther(data.data);
                if (data.data.length < 8){
                  setLimitColumn(parseInt(data.data.length / 4))
                }
          });
    });
 
  },[props.match.params.index])

  const time = new Date(artwork.end_time);


  return (
    <>
  <Helmet>
<meta property="og:title" content={artwork.title} />
<meta property="og:description"        content={artwork.medium} />
<meta property="og:image"              content={artwork.image} />
</Helmet>
      <MetaTags>
        <meta
          name="description"
          content="Find the art here. Purchase desired works. Browse and bid on paintings, prints, photos, and more by the Riabid. leading Georgian artists in curated online auctions."
        />
        <meta
          name="keywords"
          content="contemporary, art, georgian, georgian arts, design, contemporary, modern,fine art,auctions,artists,georgian artists,online auctions,prints,artworks,buy art,photographs,buy art,artwork for sale,decorative art,Artwork made by the contemporary artists in the GeorgiansGeorgia contemporary art,art from georgia,Georgia's Contemporary Artists,contemporary artists from Georgia,Georgian artist works prices,where i cen see georgian artists?,"
        />

        <title>
          {artwork.title} - {artwork.display_name}
        </title>


      </MetaTags>

    <section className="productShow">
      <div className="prod">
          <div className="picsNum">
              <button onClick={onPrevClick} >{active+1}</button>
              <span className="borderT"></span>
              <button onClick={onNextClick} >{images ? images.length : 1}</button>
          </div>
          <div className="prodPic">
          <Carousel ref={ref} onSelect={handleSelect}>
            <Carousel.Item>
                <img className="main-pic" src={artwork.image} />
            </Carousel.Item>
            {images && images.map((item,i) => {
               return i > 0 &&  <Carousel.Item key={i}><img src={item.url} className="main-pic" /></Carousel.Item>
            })}
            </Carousel>
          </div>
          <div className="prodDetails">
            <div className="title">
              <p className="withoutMargin">Created in {artwork.year}
              
              <div className="picsNum mobile">
                <span onClick={onPrevClick}>{active+1}</span>
                  <span className="borderT"></span>
                  <span onClick={onNextClick}>{images ? images.length : 1}</span>
          </div>
              </p>
              <p className="withoutMargin">by {artwork.display_name}</p>
              <h1>{artwork.title}</h1>
              <div className="size">
                <p>{artwork.medium ? ""+artwork.medium : ''}</p>
                <p>{artwork.height} x {artwork.width} {artwork.depth ? " x "+artwork.depth : ''} cm</p>

                <p className='orig'>Original artwork</p>
              </div>
              <div className="size">
                <p>ID: {artwork.id}</p>
                <p className="curat">{artwork.curator_id && <>Curated by <a href={`/curator/${artwork.curator_id}`} className="underline">{artwork?.curator_name}</a></>}</p>
                <p className='orig'>Certificate of Authenticity</p>
              </div>

                <ul>
                   <li><a href="#" onClick={(e) =>{ e.preventDefault(); favoritesMutation.mutate(artwork.id)}}><span className={localStorage.getItem('favorites') && localStorage.getItem('favorites').split(',').indexOf(props.match.params.index.toString()) > -1 ? "frameIcon active" : "frameIcon"}></span>{localStorage.getItem('favorites') && localStorage.getItem('favorites').split(',').indexOf(props.match.params.index.toString()) > -1 ? "remove" : "save"}</a></li>
                    <li><a href="#" onClick={() => setShareActive(!shareActive)}><span className="shareIcon"></span>share</a></li>
                </ul>
            </div>
            <div className="description" >
                <div className="text" dangerouslySetInnerHTML={{ __html: artwork.description }}></div>
                <ul>
                  <li><p className="price">
                <span className="currency"> {artwork.buy_it_now && `$`}</span>
               
                  {artwork.buy_it_now &&  `${artwork.buy_it_now}`}
                </p></li>
                <li><button
                className="addToCart"
                  onClick={() =>
                    addMutation.mutate({ id: artwork.id, is_gift: isGift })
                  }
                >
                  ADD TO CART
                </button></li>
                </ul>
            </div>
          </div>
      </div>
    </section>

    <section className="relatedSection">
      
    

      <div className={shareActive ? "shareBg active" : 'shareBg'}  onClick={() => setShareActive(!shareActive)}></div>


      <div><section className={shareActive ? "ra-overlay ra-share-overlay-cls ra-overlay-small ra-overlay-semitransparent ra-overlay-visible" : 'ra-overlay ra-share-overlay-cls ra-overlay-small ra-overlay-semitransparent'} ><div class="ra-overlay-centered"><div class="ra-overlay-container"><div class="ra-overlay-header"><div class="ra-wrapper ra-overlay-header-content ra-wrapper-wide-xs ra-wrapper-wide-sm ra-wrapper-wide-md ra-wrapper-wide-lg ra-wrapper-wide-xl"><div class="ra-overlay-header-info"><h3 class="ra-heading ra-heading-level-3">Share</h3></div><span role="img" tabindex="-1" class="anticon ra-overlay-close" onClick={() => setShareActive(!shareActive)}><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M1.231 28.681l27.999-26.963 1.541 1.601-27.999 26.963-1.541-1.601z"></path><path d="M1.231 3.319l1.541-1.601 27.999 26.963-1.541 1.601-27.999-26.963z"></path></svg></span></div></div><div class="ra-wrapper ra-overlay-body ra-share ra-wrapper-fullwidth-xs ra-wrapper-fullwidth-sm ra-wrapper-fullwidth-md ra-wrapper-fullwidth-lg ra-wrapper-fullwidth-xl"><ul class="ra-share-list">
      <li class="ra-share-list-item"><a target="_BLANK" href={`https://www.facebook.com/sharer/sharer.php?u=https://riabid.com/store/${artwork.id}`}><button aria-label="facebook" class="react-share__ShareButton ra-share-list-item-button"><div class="ra-share-list-item-button-inner"><span role="img" class="anticon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M12.827 11.182h-3.178v4.818h3.173v14.444h5.289v-14.444h3.809l0.444-4.813h-4.249v-2.044c0-1.204 0.213-1.564 1.164-1.564h3.067v-6.022h-4c-3.827 0-5.52 1.924-5.52 5.556v4.093z"></path></svg></span><span>Facebook</span></div></button></a></li>
      <li class="ra-share-list-item"><a target="_BLANK" href={`https://twitter.com/intent/tweet?url=https://riabid.com/store/${artwork.id}`} ><button aria-label="twitter" class="react-share__ShareButton ra-share-list-item-button"><div class="ra-share-list-item-button-inner"><span role="img" class="anticon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M3.498 5.333c2.951 3.59 7.296 5.94 12.195 6.22l0.045 0.002c-0.036-0.369-0.080-0.702-0.102-1.040-0.012-0.137-0.019-0.296-0.019-0.456 0-1.194 0.38-2.298 1.026-3.2l-0.011 0.017c1.043-1.614 2.833-2.667 4.869-2.667 0.288 0 0.571 0.021 0.847 0.062l-0.031-0.004c1.323 0.145 2.487 0.734 3.36 1.613l0 0c0.089 0.101 0.219 0.164 0.363 0.164 0.056 0 0.11-0.010 0.16-0.027l-0.003 0.001c1.177-0.272 2.215-0.678 3.172-1.213l-0.060 0.031 0.351-0.182c-0.451 1.352-1.319 2.464-2.448 3.212l-0.023 0.014c1.198-0.142 2.288-0.423 3.315-0.831l-0.088 0.031c-0.209 0.284-0.409 0.573-0.636 0.844-0.616 0.752-1.302 1.41-2.059 1.978l-0.030 0.022c-0.109 0.074-0.18 0.197-0.18 0.336 0 0.015 0.001 0.029 0.002 0.043l-0-0.002c0.004 0.142 0.007 0.309 0.007 0.476 0 3.834-1.252 7.375-3.369 10.238l0.033-0.047c-1.938 2.735-4.664 4.798-7.844 5.874l-0.111 0.033c-1.645 0.572-3.542 0.902-5.515 0.902-0.817 0-1.62-0.057-2.407-0.166l0.091 0.010c-2.57-0.336-4.882-1.218-6.89-2.528l0.063 0.039c0.378 0.042 0.816 0.065 1.26 0.065 2.81 0 5.397-0.953 7.457-2.553l-0.027 0.021c-2.702-0.236-4.538-1.6-5.547-4.147 0.318 0.057 0.683 0.089 1.057 0.089 0.572 0 1.127-0.076 1.654-0.219l-0.044 0.010c-1.391-0.303-2.572-1.058-3.409-2.099l-0.009-0.012c-0.806-0.989-1.294-2.264-1.294-3.654 0-0.034 0-0.069 0.001-0.103l-0 0.005c0.444 0.164 0.844 0.356 1.271 0.476 0.386 0.101 0.841 0.177 1.307 0.212l0.026 0.002c-1.19-0.866-2.049-2.124-2.392-3.58l-0.008-0.042c-0.097-0.402-0.153-0.863-0.153-1.337 0-1.080 0.289-2.092 0.795-2.963l-0.015 0.028z"></path></svg></span><span>Twitter</span></div></button></a></li>
      <li class="ra-share-list-item"><a href={`mailto:?subject=Riabid.com&amp;body=Check out this site https://riabid.com/store/${artwork.id}`}><button aria-label="email" class="react-share__ShareButton ra-share-list-item-button"><div class="ra-share-list-item-button-inner"><span role="img" class="anticon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16.187 17.667l14.529-10.64v-0.178h-29.058v0.178l14.529 10.64z"></path><path d="M28.404 22.822l2.311 2.013-0.031-16.067-9.804 7.173 7.524 6.88z"></path><path d="M11.409 15.884l-9.724-7.116-0.027 16.031 9.751-8.916z"></path><path d="M16.187 19.307l-3.636-2.662-9.982 9.129h27.084l-9.916-9.067-3.551 2.6z"></path></svg></span><span>E-mail</span></div></button></a></li>
      <li class="ra-share-list-item"><a target="_BLANK" href={`whatsapp://send?text=https://riabid.com/store/${artwork.id}`}><button aria-label="whatsapp" class="react-share__ShareButton ra-share-list-item-button"><div class="ra-share-list-item-button-inner"><span role="img" class="anticon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M8.533 12.849c0.308 1.045 0.651 1.93 1.057 2.778l-0.048-0.112c0.627 1.067 1.283 1.988 2.011 2.847l-0.024-0.029c1.901 2.329 4.579 3.96 7.635 4.496l0.076 0.011c0.221 0.048 0.475 0.075 0.735 0.075 1.041 0 1.98-0.436 2.645-1.136l0.001-0.002c1.062-1.049 0.844-2.333-0.444-2.964l-0.516-0.253c-1.88-0.924-1.898-0.938-3.236 0.613-0.167 0.249-0.448 0.411-0.767 0.411-0.19 0-0.366-0.057-0.512-0.156l0.003 0.002c-1.791-0.817-3.26-2.073-4.31-3.634l-0.023-0.037c-0.413-0.604-0.444-1.040 0.116-1.551 0.402-0.286 0.661-0.75 0.661-1.275 0-0.322-0.097-0.62-0.264-0.869l0.004 0.006c-0.217-0.422-0.445-0.945-0.642-1.483l-0.033-0.103c-0.6-1.413-1.92-1.604-2.933-0.418-0.638 0.757-1.062 1.714-1.167 2.765l-0.002 0.021zM1.6 30.369c0.56-2.076 1.067-4.062 1.64-6.027 0.080-0.248 0.126-0.534 0.126-0.83 0-0.463-0.112-0.899-0.311-1.284l0.007 0.016c-2.449-5.476-1.951-10.716 1.862-15.36s8.853-6.271 14.631-4.818 9.36 5.267 10.538 11.040-0.653 10.667-5.293 14.249-9.689 3.942-14.987 1.667c-0.297-0.127-0.643-0.201-1.006-0.201-0.163 0-0.322 0.015-0.477 0.043l0.016-0.002c-2.013 0.418-4 0.92-6.013 1.382-0.2 0.049-0.409 0.067-0.733 0.12z"></path></svg></span><span>Whatsapp</span></div></button></a></li>
      <li class="ra-share-list-item"><a href={`https://www.pinterest.com/pin/create/button/?url=https://riabid.com/store/${artwork.id}`} target="_BLANK"><button aria-label="pinterest" class="react-share__ShareButton ra-share-list-item-button"><div class="ra-share-list-item-button-inner"><span role="img" class="anticon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M10.812 17.64c-1.931-0.264-2.816-1.062-3.225-2.598-1.326-4.985 2.453-9.869 7.914-10.131 0.166-0.008 0.361-0.013 0.556-0.013 1.030 0 2.031 0.127 2.987 0.367l-0.084-0.018c4.609 1.133 6.708 5.282 5.276 10.261-0.946 3.29-3.014 5.382-5.799 5.444-1.299 0.029-2.612-0.546-4.048-0.878-0.668 2.252-0.921 5.032-3.309 7.027-0.377-2.469-0.077-4.658 0.473-6.831 0.243-0.965 0.46-1.931 0.715-2.886 0.166-0.595 0.261-1.279 0.261-1.984 0-0.455-0.040-0.9-0.116-1.333l0.007 0.046c-0.164-1.051 0.229-2.287 0.676-3.307 0.413-0.935 1.389-1.274 2.432-0.853s1.209 1.302 0.989 2.26c-0.299 1.344-0.796 2.655-1.001 4.006-0.102 0.676 0.033 1.744 0.473 2.060 0.593 0.425 1.69 0.579 2.376 0.328 0.813-0.302 1.607-1.047 2.075-1.807 1.072-1.738 1.38-3.719 1.020-5.74-0.505-2.834-2.747-4.414-5.769-4.146-3.154 0.281-5.844 3.009-5.844 6.062 0 0.781 0.386 1.558 0.552 2.346 0.159 0.729 0.264 1.467 0.413 2.32z"></path></svg></span><span>Pinterest</span></div></button></a></li>
      <li class='ra-share-list-item'><a href="#" onClick={(e)=> {e.preventDefault(); 
      var dummy = document.createElement('input'),
      text = window.location.href;
  
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
      }}><button className='react-share__ShareButton ra-share-list-item-button'><div className='ra-share-list-item-button-inner'><span>Copy URL</span></div></button></a></li>
      
      </ul></div></div></div></section></div>

<div className="paddingLeft">
     <h1 className='related'>author artworks</h1>
   

     <div className="row "  >
            <div className='col-6 col-lg-3'>
                         
                    {other_work ? (
                    <ProductBlock
                    start={0}
                    limit={limitColumn}
                    data={other_work}
                    />
                    ) : null}
                             
            </div>
            <div className='col-6 col-lg-3'>
                         
                         {other_work ? (
                         <ProductBlock
                         start={limitColumn}
                         limit={limitColumn}
                         data={other_work}
                         />
                         ) : null}
                                  
                 </div>
                 <div className='col-6 col-lg-3'>
                         
                         {other_work ? (
                         <ProductBlock
                         start={2*limitColumn}
                         limit={limitColumn}
                         data={other_work}
                         />
                         ) : null}
                                  
                 </div>
                 <div className='col-6 col-lg-3'>
                         
                         {other_work ? (
                         <ProductBlock
                         start={3*limitColumn}
                         limit={limitColumn}
                         data={other_work}
                         />
                         ) : null}
                                  
                 </div>
          </div>
          </div>


    </section></>
  );
}
