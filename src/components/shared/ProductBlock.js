import React, { useRef, useState } from "react";

function ProductBlock({  
  data,
  start,
  limit
}) {
  return (
    data.slice(start,start+limit).map(function(item, i){
                return <div className="productBlock" key={i}>
                    <img src={item.front_thumbnail} className="productImage"/>
                    <div className='frame'>
                        <span className="frameIcon"></span>
                        <span className="frametext">fave</span>
                    </div>
                    <div className="author">
                        <p>{item.display_name}</p>
                        <p>{item.title}</p>
                        <p className='size'>{item.width} x {item.height} cm</p>
                    </div>
                    {item.price_usd != 0 && <span className="price">
                        {item.price_usd} ₾ 
                    </span> }
                </div>
              })
        
  );
}

export default ProductBlock;