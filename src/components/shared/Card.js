import React from "react";
import { QueryClient,useMutation } from "react-query";
import { Link } from "react-router-dom";
import soldImg from "../../assets/sold.png";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  addBag,
  addComment,
  addFavorites,
  requestPrice,
} from "../../services/bagService";
function Card({
  type,
  img,
  name,
  price,
  secondParam,
  end_time,
  index,
  display_name,
  sold,
  is_geo,
  price_usd,
  privileged,
  special,
  collection,
  dragging,
  width,
  height,
  depth
}) {
  const favoritesMutation = useMutation(addFavorites, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error("You need to login");
    },
    onSuccess: (data, variables, context) => {
      toast.dark("Artwork added to favorites", {
        progress: undefined,
        hideProgressBar: true,
      });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const getPrivilegedIcon = (privileged) =>
    privileged ? (
      // <img src={Star} alt="privileged-icon" style={{
      //   width: '20px',
      //   height: '20px',
      //   position: 'absolute',
      //   zIndex: 5,
      //   right: '10px',
      //   top: '-10px'
      // }}></img> ) :
      <FaStar
        size="20px"
        style={{
          position: "absolute",
          top: "0px",
          right: "3px",
          color: "#fcba03",
          zIndex: 5,
        }}
      />
    ) : null;

  return (
    <div className="product flex column">
      {sold ? (
        <div className="sold">
          <img alt="Sold image" src={soldImg}></img>
        </div>
      ) : null}
      <a href={"/store/" + index} style={{ position: "relative" }} onClick={(e)=> dragging && e.stopPropogation() && e.preventDefault()}>
        <div className="img">
        {getPrivilegedIcon(privileged)}
          <div class='group'>
            
            <img
              alt={name}
              src={img}
            ></img>
          </div>
        </div>
        {!special ? (
          <div class='title_tag'>
            <p className="title">
              <i>{name}</i>
            </p>
            <p className="titles">{display_name} </p>
            <p className="depth">{width}x{height}{depth ? ('x'+depth) : null } cm</p>
          </div>
        ) : null}
      </a>
      {!special ? (
        <div className="flex space-between price_tag">
          <div className="gr">
            <p className="price">{parseFloat(price)==0 ? 'Contact For Price' : is_geo ? `₾ ${price}` : `$ ${price_usd}`}</p>
            <span class='heart' onClick={() => favoritesMutation.mutate(index)}></span>
          </div>
          <p className="time gray"></p>
        </div>
      ) : null}
      {special ? (
        <a href={"/collections/" + collection.id}>
          <div className="flex space-between collection-title">
            <div className="flex">{collection.collection_name}</div>
          </div>
        </a>
      ) : null}
    </div>
  );
}

export default Card;
