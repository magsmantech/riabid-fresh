import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import editIcon from "../../assets/icons/edit.png";
import removeIcon from "../../assets/icons/remove.png";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast, ToastContainer } from 'react-toastify';

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
      //toast.error(error.context);
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
      //toast.error(error.context);
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
      let favorites = localStorage.getItem('favorites').split(',');
      console.log(favorites);
      console.log(variables);
      let ind = favorites.indexOf(variables.toString());
      console.log('found index --- '+ind)
      if(ind == -1){
        favorites.push(variables.toString());
        console.log('added');
        console.log(favorites);
      }else{
        favorites.splice(ind,1);
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

  return (
      data.length > 0 ? data.slice(start,start+limit).map(function(item, i){
                let frameMax = '';
                if(item.price_usd == 0 && !item.request_price)
                  frameMax = 'forTop';
                return <div className={col ? "col-md-"+col : ""} key={i}><div className="productBlock" >
                    {edit && <Link
                          to={"/dashboard/editartwork/" + item.id}
                        >{<img src={editIcon} className='edit'/>}</Link>}
                    {(edit || remove) && <img src={removeIcon} className='remove' onClick={() =>{if(!remove) { deleteMutation.mutate(item.id) } else { removeMutation.mutate(item.id) }}}/>}

                    <Link to={`/store/${item.id}`}><img src={item.front_thumbnail} className="productImage"/></Link>
                    
                    <div className={favorite ? "frame active "+frameMax : "frame "+frameMax } onClick={() => favoritesMutation.mutate(item.id)}>
                        <span className={localStorage.getItem('favorites').split(',').indexOf(item.id.toString()) > -1 ? "frameIcon active" : "frameIcon"}></span>
                        <span className="frametext">save</span>
                    </div>
                    <div className="author">
                        <Link to={`/artists/${item.artist_id}`}>{item.display_name}</Link>
                        <p>{item.title}</p>
                        <p className='size'>{item.width} x {item.height} cm</p>
                    </div>
                    {!item.request_price && <span className="price">
                        {item.is_geo ? item.buy_it_now ? item.buy_it_now+' ₾': '' : item.price_usd+' $'}  
                    </span> }
                    {item.request_price ? (             
                      <span className="price">Contact for Price</span>                 
                     ):''}
                </div></div>
          
              }) : ''
        
  );
}

export default ProductBlock;