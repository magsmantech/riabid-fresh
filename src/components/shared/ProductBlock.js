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
                let frameMax = '';
                if(item.price_usd == 0 && !item.request_price)
                  frameMax = 'forTop';
                return <div className={col ? "col-md-"+col : ""} key={i}><div className="productBlock" >
                    {edit && <Link
                          to={"/dashboard/editartwork/" + item.id}
                        >{<img src={editIcon} className='edit'/>}</Link>}
                    {(edit || remove) && <img src={removeIcon} className='remove' onClick={() =>{if(!remove) { deleteMutation.mutate(item.id) } else { removeMutation.mutate(item.id) }}}/>}

                    <Link to={`/store/${item.id}`}><img src={item.front_thumbnail} className="productImage"/></Link>
                    <div className="row">
                      <div className={type == 1 ? "col-4 order-last col-sm-3 order-sm-first" : "col-4 order-last order-sm-first col-sm-2"}>
                        <div className="mMobile">
                          {item.buy_it_now && <span className="price">
                              {item.buy_it_now+' $'}  
                          </span> }
                          {item.request_price ? (             
                            <span className="price">Contact for Price</span>                 
                          ):''}
                        </div>
                        
                        <div className={favorite ? "frame active "+frameMax : "frame "+frameMax } onClick={() => favoritesMutation.mutate(item.id)}>
                            <span className={localStorage.getItem('favorites').split(',').indexOf(item.id.toString()) > -1 ? "frameIcon active" : "frameIcon"}></span>
                            <span className="frametext">{localStorage.getItem('favorites').split(',').indexOf(item.id.toString()) > -1 ? 'remove' : 'save'}</span>
                        </div>
                      </div>
                      <div className={type == 1 ? "col-8 col-sm-6" : "col-8 col-sm-8"}>
                        <div className="author">
                            <Link to={`/artists/${item.artist_id}`}>{item.display_name}</Link>
                            <p>{item.title}</p>
                            <p className='size'>{item.width} x {item.height} cm</p>
                        </div>
                      </div>
                      <div className={type == 1 ? "nMobile col-sm-3" : "nMobile col-sm-2"}>
                        {item.buy_it_now && <span className="price">
                            {item.buy_it_now+' $'}  
                        </span> }
                        {item.request_price ? (             
                          <span className="price">Contact for Price</span>                 
                        ):''}
                      </div>
                    </div>
                </div></div>
          
              }) : ''
        
  );
}

export default ProductBlock;