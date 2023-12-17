import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import editIcon from "../../assets/icons/edit.svg";
import removeIcon from "../../assets/icons/remove.svg";
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

function AuctionBlock({  
  data,
  start,
  limit,
  edit=null,
  favorite=null,
  col=null,
  remove=null,
  setFavores=null,
  type=null
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

      let ind = favorites.indexOf(variables.toString());
      if(ind == -1){
        favorites.push(variables.toString());
  
      }else{
        favorites.splice(ind,1);
        localStorage.setItem('favorites',favorites);
        setFavores(favorites)
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
          
                return <div key={i}>
                <img src={item.image} className="artworkAuction w-100" data-id={item.id}/>
               <div className="row mobHide">
                   <div className="col-md-4">
                       <span className="lotNum"># {item.lot_number}</span>
                       <span className="author">{item.display_name}</span>
                       <span className="artworkName">{item.title}</span>
                   </div>
                   <div className='col-md-4'>
                       <span className="estimate">Starting</span>
                       <span className="bullet">•</span>
                       <span className="price">{item.buy_it_now} $</span>
                   </div>
                   <div className="col-md-4">
                       <span className="sold">Sold for</span>
                       <span className="bullet">•</span>
                       <span className="onSale">{item.sold_for == 0 ?  "On sale" : item.sold_for+" $"}</span>
                   </div>
               </div>
               <div className="row displayHide">
                  <div className="col-12">
                    <span className="author">{item.display_name} <span className="lotNum"># {item.lot_number}</span></span>
                    <span className="artworkName">{item.title}</span>
                    <span className="estimate">Starting <span className="price">{item.buy_it_now} $</span></span>
                    <span className="sold lastBlockSold">Sold for <span className="onSale">{item.sold_for == 0 ?  "On sale" : item.sold_for+" $"}</span></span>
                  </div>
               </div>
           </div>
          
              }) : ''
        
  );
}

export default AuctionBlock;