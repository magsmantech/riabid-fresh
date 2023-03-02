import React, { useEffect, useState, useRef} from "react";
import ProductBlock from "./ProductBlock";
import { Link } from "react-router-dom";
import Loading from "../../containers/loading";
import axios from '../../lib/axios';
import {cats} from '../../containers/artwork/cats'

export default function ProductGrid(){

    const [curator, setCurator] = useState({'id':null,'name':null,'lastname':null}); 
    const [artworks,setArtworks] = useState({'data':[]});
    const [category_products,setCategoryProducts] = useState({'data':[]});
    const [url,setUrl] = useState('');
    const [category,setCategory] = useState(0);
    const [grid, setGrid] = useState(2);  
    const myGrid = useRef(null);
    const myCats = useRef(null);
    
      useEffect(function(){
          axios.get('dashboard/curator-artworks?limit=6')
            .then((res) => {
                  let {artworks,curator} = res.data.data;
                  setCurator({'id':curator.id, 'name':curator.name,'lastname':curator.lastname})
                  setArtworks(artworks);            
                  setUrl("/curator/"+curator.id)
            });

            axios.get('artworks-paginated?limit=8')
            .then((res) => {
                  let data = res.data;
                  setCategoryProducts(data);
            });
        },[])

    function handleCategory(e,category,page){
      e.preventDefault();      
      setCategory(category);
      let urld;
      if (category == 0){
        urld = "artworks-paginated?limit=8&page="+page;
      }else{
        urld = "categories/"+category+"/artworks?limit=8&page="+page;
      }
          axios.get(urld)
            .then((res) => {
                  let data = res.data;
                  setCategoryProducts(data);
            });
    }

    function handleType(e, type,page){    
        e.preventDefault();
        setGrid(type);
        let url;
        if (type == 0){
            url = 'categories/trending/artworks?limit=6&page='+page;
            setUrl("/store?page=trending")
        }else if(type == 1){
            url = 'categories/featured/artworks?limit=6&page='+page
            setUrl("/store?page=featured")
        }else{
            url = 'dashboard/curator-artworks?limit=6&page='+page;
            setUrl("/curator/"+curator.id);
        }
        axios.get(url)
            .then((res) => {
                  if(type == 2){
                    let {artworks} = res.data.data;
                    console.log(artworks);
                    setArtworks(artworks);      
                  }
                  else{
                    let {data} = res;
                    setArtworks(data);      
                  }
                           
            })
    }
    return (
        <div className="row" ref={myGrid} >
            <div className='col-4'>
            <ul className="trendMenu">
                <li className={grid == 0 ? "active" : ""}><a href="#" onClick={e => handleType(e,0,1)} >trending</a></li>
                <li className={grid == 1 ? "active" : ""}><a href="#" onClick={e => handleType(e,1,1)} >featured</a></li>
            </ul>
                
                    {artworks.data ? (
                    <ProductBlock
                    start={0}
                    limit={2}
                    data={artworks.data}
                    />
                    ) : null}
                             
            </div>
            <div className='col-4'>
            <ul className="trendMenu fullWidth">
                <li className={grid == 2 ? "active" : ""}><a href="#" onClick={e => handleType(e,2,1)} >curators <span>choice made by <span classname='author'>{curator.name} {curator.lastname}</span></span></a></li>
            </ul>

          
                    {artworks.data.length ? (
                    <ProductBlock
                    start={2}
                    limit={2}
                    data={artworks.data}
                    />
                    ) : null}
        
               
              
            </div>
            <div className='col-4'>
            <ul className="trendMenu fullWidth">
            
            </ul>          
           
                    {artworks.data.length ? (
                    <ProductBlock
                    start={4}
                    limit={2}
                    data={artworks.data}
                    />
                    ) : null}
               
            </div>


            <div className="row productPaginate">
                <div className='col-4 prevPage'>
                    <a to="#" onClick={e => { if(artworks.current_page -1 < artworks.last_page && artworks.current_page -1 != 0 ){  handleType(e,grid,artworks.current_page-1);} myGrid.current.scrollIntoView({behavior: 'smooth', block: 'center'}) }}>PREV</a>
                </div>
                <div className='col-4 centerPage'>
                <Link to={url}>ALL ARTWORKS</Link>
                </div>
                <div className='col-4 nextPage'>
                <a to="#" onClick={e => { if(artworks.current_page +1 < artworks.last_page){ handleType(e,grid,artworks.current_page+1); } myGrid.current.scrollIntoView({behavior: 'smooth'})}}>NEXT</a>
                </div>
            </div>


        <div className="row" ref={myCats}>
        <div className='col-12'>
          <ul className="trendMenu allMenu">
            <li className={category == 0 ? "active" : ""}><Link to="/store" onClick={(e)=>{handleCategory(e,0,1)}}>all art</Link></li>
            {cats.map(item => {
              return <li className={category == item.id ? "active" : ""}><Link to="#" onClick={(e)=>{handleCategory(e,item.id,1)}}>{item.title}</Link></li>
            })}
          </ul>
        </div>
        <div className='col-3'>
         {category_products.data.length ? (
                    <ProductBlock
                    start={0}
                    limit={2}
                    data={category_products.data}
                    />
                    ) : null}
        </div>
        <div className='col-3'>
        {category_products.data.length ? (
                    <ProductBlock
                    start={2}
                    limit={2}
                    data={category_products.data}
                    />
                    ) : null}          
        </div>
        <div className='col-3'>
        {category_products.data.length ? (
                    <ProductBlock
                    start={4}
                    limit={2}
                    data={category_products.data}
                    />
                    ) : null}        
        </div>
        <div className='col-3'>
        {category_products.data.length ? (
                    <ProductBlock
                    start={6}
                    limit={2}
                    data={category_products.data}
                    />
                    ) : null}        
        </div>
      </div>
      <div className="row productPaginate">
                <div className='col-4 prevPage'>
                    <a to="#" onClick={e => { if(category_products.current_page -1 < category_products.last_page && category_products.current_page -1 != 0 ){ console.log('clicked'); handleCategory(e,category,category_products.current_page-1);} myCats.current.scrollIntoView({behavior: 'smooth', block: 'center'}) }}>PREV</a>
                </div>
                <div className='col-4 centerPage'>
                <Link to="/store">ALL ARTWORKS</Link>
                </div>
                <div className='col-4 nextPage'>
                <a to="#" onClick={e => { if(category_products.current_page +1 < category_products.last_page){ handleCategory(e,category,category_products.current_page+1); } myCats.current.scrollIntoView({behavior: 'smooth'})}}>NEXT</a>
                </div>
            </div>


        </div>
    )
}