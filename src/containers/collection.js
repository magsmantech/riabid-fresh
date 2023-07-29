
import React, { useEffect, useState } from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import axios from '../lib/axios';
import ProductBlock from "../components/shared/ProductBlock";
import { MetaTags } from "react-meta-tags";

function Collection(props) {

    const [boxLength, setBoxLength] = useState([]);
    const [show, setShow] = useState(4); 
    const [artworks, setArtworks] = useState({'data':[]});
    useEffect(function(){
        axios.get("collections/"+props.match.params.id)
            .then((res) => {
                  let addon_data = res.data;
                  setArtworks(addon_data);
                  let arr = divideBoxIntoColumns(addon_data.artworks.length,show);
           
                  setBoxLength(arr)
            });   
      },[])
      
      function divideBoxIntoColumns(boxWidth,columns) {
          const columnWidth = Math.floor(boxWidth / columns);
          const remainder = boxWidth % columns;
          return [columnWidth + (remainder > 0 ? 1 : 0), columnWidth + (remainder > 1 ? 1 : 0), columnWidth + (remainder > 2 ? 1 : 0), columnWidth];
        }
      
       
  return (<>
     <MetaTags>
        <title>Art Collection on Ria Bid</title>
        <meta
          name="description"
          content="Browse digital galleries.Travel digital art."
        />
        <meta
          name="keywords"
          content="art gallery, art online, galleries, sell art, decorative art,Discover Contemporary Artists, contemporary artists from Georgia,georgian contemporary artists,"
        />
      </MetaTags>
    <section className="specialProjects paddingLeft">
        <div className="row forPad">
            <div className="col-md-4 flex dir">
                <div>
                    <h1>{artworks && artworks.collection_name}</h1>
                    <p>{artworks && artworks.date}</p>
                    <p>{artworks && artworks.address}</p>
                </div>
                <div className="offset-1 offset-md-0 text">
                {artworks && ReactHtmlParser(artworks.description)}
                </div>
            </div>
            <div className="offset-md-1 col-md-6">
               {artworks && <img src={artworks.image} className="w-100"/>}
            </div>
        </div>
    </section>
    
    <div className='row curatedArtworks' >
    <h1>Selected artworks</h1>

<div className='col-6 col-lg-3'>



  {artworks.artworks && boxLength.hasOwnProperty(0) && <ProductBlock
        start={0}
        limit={boxLength[0]}
        data={artworks.artworks}
        /> }
</div>
<div className='col-6 col-lg-3'>
{artworks.artworks && boxLength.hasOwnProperty(1) && <ProductBlock
        start={boxLength[0]}
        limit={boxLength[1]}
        data={artworks.artworks}
        /> }
</div>
<div className='col-6 col-lg-3'>
{artworks.artworks && boxLength.hasOwnProperty(2) && <ProductBlock
        start={boxLength[1]+boxLength[0]}
        limit={boxLength[2]}
        data={artworks.artworks}
        /> }
</div>
<div className='col-6 col-lg-3'>
{artworks.artworks && boxLength.hasOwnProperty(3) && <ProductBlock
        start={boxLength[2] + +boxLength[1] + +boxLength[0]}
        limit={boxLength[3]}
        data={artworks.artworks}
        /> }
</div>

</div></>
  );
}

export default Collection;