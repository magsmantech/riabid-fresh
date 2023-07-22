
import React, { useEffect, useState } from "react";

import {
  getArtworks,
  getArtworksNew,
  getArtworksPride,
  getArtworksSpecial
} from "../services/artworksService";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "./loading";
import pride from "../assets/images/pride.png";
import axios from '../lib/axios';
import ProductBlock from "../components/shared/ProductBlock";






function Pride_html(props) {

    const [boxLength, setBoxLength] = useState([]);
    const [show, setShow] = useState(4); 
    const [artworks, setArtworks] = useState({'data':[]});
    useEffect(function(){
        axios.get("artworks-paginated?limit=16")
            .then((res) => {
                  let addon_data = res.data;
                
                  addon_data['data'] = [...addon_data.data];       
                  
                  setArtworks(addon_data);
                  let arr = divideBoxIntoColumns(addon_data.data.length,show);
                  setBoxLength(arr)
            });   
      },[])
      
      function divideBoxIntoColumns(boxWidth,columns) {
          const columnWidth = Math.floor(boxWidth / columns);
          const remainder = boxWidth % columns;
          return [columnWidth + (remainder > 0 ? 1 : 0), columnWidth + (remainder > 1 ? 1 : 0), columnWidth + (remainder > 2 ? 1 : 0), columnWidth];
        }
      

        
  return (<>
    <section className="specialProjects paddingLeft">
        <div className="row forPad">
            <div className="col-md-4 flex dir">
                <div>
                    <h1>Tbilisi pride</h1>
                    <p>06 jun 23 – 15 jun 23</p>
                    <p>5 Besiki Street , Tbilisi 0108</p>
                </div>
                <div className="offset-1 offset-md-0 text">
                In the wake of the protest demonstrations against LGBT rights, R K Foundation took a step to express enormous support to Tbilisi Pride which has been cancelled after violent disruption. Our platform joined all creative forces via talented artists to create series of works dedicated to such an issue. Collected funds for selected artworks will be successfully donated to Tbilisi Pride.
In the wake of the protest demonstrations against LGBT rights, R K Foundation took a step to express enormous support to Tbilisi Pride which has been cancelled after violent disruption. Our platform joined all creative forces via talented artists to create series of works dedicated to such an issue. Collected funds for selected artworks will be successfully donated to Tbilisi Pride.
In the wake of the protest demonstrations against LGBT rights, R K Foundation took a step to express enormous support to Tbilisi Pride which has been cancelled after violent disruption. 
                </div>
            </div>
            <div className="offset-md-1 col-md-6">
                <img src={pride} className="w-100"/>
            </div>
        </div>
    </section>
    
    <div className='row curatedArtworks' >
    <h1>event artworks</h1>

<div className='col-6 col-lg-3'>



  {artworks.data && boxLength.hasOwnProperty(0) && <ProductBlock
        start={0}
        limit={boxLength[0]}
        data={artworks.data}
        /> }
</div>
<div className='col-6 col-lg-3'>
{artworks.data && boxLength.hasOwnProperty(1) && <ProductBlock
        start={boxLength[0]}
        limit={boxLength[1]}
        data={artworks.data}
        /> }
</div>
<div className='col-6 col-lg-3'>
{artworks.data && boxLength.hasOwnProperty(2) && <ProductBlock
        start={boxLength[1]+boxLength[0]}
        limit={boxLength[2]}
        data={artworks.data}
        /> }
</div>
<div className='col-6 col-lg-3'>
{artworks.data && boxLength.hasOwnProperty(3) && <ProductBlock
        start={boxLength[2] + +boxLength[1] + +boxLength[0]}
        limit={boxLength[3]}
        data={artworks.data}
        /> }
</div>

</div></>
  );
}

export default Pride_html;