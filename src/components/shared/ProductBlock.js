import React, { useRef, useState } from "react";
function ProductBlock({  
  data
}) {
  return (
    data.slice(0,2).map(function(item, i){
                return <div className="productBlock" key={i}>
                    <img src={item.image} className="productImage" />
                    <div className='frame'>
                        <span className="frameIcon"></span>
                        <span className="frametext">fave</span>
                    </div>
                    <div className="author">
                        <p>{item.display_name}</p>
                        <p>{item.title}</p>
                        <p className='size'>{item.width} x {item.height} cm</p>
                    </div>
                    <span className="price">
                        {item.buy_it_now} ₾
                    </span>
                </div>
              })
        
  );
}

export default ProductBlock;