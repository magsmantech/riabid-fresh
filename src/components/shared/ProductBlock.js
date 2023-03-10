import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import editIcon from "../../assets/icons/edit.png";
import removeIcon from "../../assets/icons/remove.png";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { createOrder, removeItem } from "../../services/dashboardService";
import {
  deleteArtwork,
  getArtworks,
  requestAuction,
} from "../../services/dashboardService";
import {
  addBag,
  addComment,
  addFavorites,
  requestPrice,
} from "../../services/bagService";

function ProductBlock({  
  data,
  start,
  limit,
  edit=null,
  favorite=null,
  col=null,
  remove=null
}) {

  const removeMutation = useMutation(removeItem, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.context);
    },
    onSuccess: (data, variables, context) => {
      toast("You successfully removed item");
      queryClient.invalidateQueries("bag");
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteArtwork, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.context);
    },
    onSuccess: (data, variables, context) => {
      toast.dark("You successfully deleted artwork", {
        progress: undefined,
        hideProgressBar: true,
      });
      queryClient.invalidateQueries("artworksDashboard");
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
      toast.dark("Artwork added to favorites", {
        progress: undefined,
        hideProgressBar: true,
      });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  return (
      data.length > 0 ? data.slice(start,start+limit).map(function(item, i){
                return <div className={col ? "col-md-"+col : ""} key={i}><div className="productBlock" >
                    {edit && <Link
                          to={"/dashboard/editartwork/" + item.id}
                        >{<img src={editIcon} className='edit'/>}</Link>}
                    {(edit || remove) && <img src={removeIcon} className='remove' onClick={() =>{if(!remove) { deleteMutation.mutate(item.id) } else { removeMutation.mutate(item.id) }}}/>}

                    <Link to={`/store/${item.id}`}><img src={item.front_thumbnail} className="productImage"/></Link>
                    <div className={favorite ? "frame active" : "frame"} onClick={() => favoritesMutation.mutate(item.id)}>
                        <span className="frameIcon"></span>
                        <span className="frametext">save</span>
                    </div>
                    <div className="author">
                        <p>{item.display_name}</p>
                        <p>{item.title}</p>
                        <p className='size'>{item.width} x {item.height} cm</p>
                    </div>
                    {item.price_usd != 0 && <span className="price">
                        {item.price_usd} ??? 
                    </span> }
                    {item.request_price ? (             
                      <span className="price">Contact for Price</span>                 
                     ):''}
                </div></div>
              }) : ''
        
  );
}

export default ProductBlock;