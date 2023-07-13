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
    const [grid, setGrid] = useState(1);
    const [show, setShow] = useState(4);  
    const myGrid = useRef(null);
    const myCats = useRef(null);
    

    // React.useEffect(() => {
    //   handleResize();
    //   window.addEventListener('resize', handleResize)
    //   return () =>{
    //     window.removeEventListener('resize', handleResize)
    //   }
    // },[])
    // function handleResize() {
    //   if(window.innerWidth > 991)
    //     setShow(3);
    //   else 
    //     setShow(4);
    // }
 
    
      useEffect(function(){
        let url;
        url = 'categories/featured/artworks?limit=7'
        setUrl("/store?page=featured")
       
        axios.get(url)
            .then((res) => {
               
                    let {data} = res;
                    setArtworks(data);      
                
                           
            })

            axios.get('artworks-paginated?limit=16')
            .then((res) => {
                  let data = res.data;
                  setCategoryProducts(data);
            });
        },[])
/*
        useEffect(() => {
       
          window.addEventListener('wheel', scrolling,false)
    
          return () => {
            window.removeEventListener('wheel', scrolling)
          }
        }, [])
*/
        function scrolling() {      
       
          var sticky = document.getElementById("galP").offsetTop;
          var sticky2 = document.getElementById("galP2").offsetTop;
          
    
          if (document.body.scrollTop > sticky-25) {

            if(document.body.scrollTop > sticky2-25){              
              document.getElementById("forStick2").classList.add("sticky");
              document.getElementById("forStickyPos").classList.remove("sticky");
            }else{
              document.getElementById("forStickyPos").classList.add("sticky");
              document.getElementById("forStick2").classList.remove("sticky");
            }            
          } else {
            document.getElementById("forStickyPos").classList.remove("sticky");
            document.getElementById("forStick2").classList.remove("sticky");
          }
        }

    function handleCategory(e,category,page){
      e.preventDefault();      
      setCategory(category);
      let urld;
      let limit = 16;
      if (category == 0){
        urld = "artworks-paginated?limit="+limit+"&page="+page;
      }else{
        urld = "categories/"+category+"/artworks?limit="+limit+"&page="+page;
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
            url = 'categories/trending/artworks?limit=7&page='+page;
            setUrl("/store?page=trending")
        }else if(type == 1){
            url = 'categories/featured/artworks?limit=7&page='+page
            setUrl("/store?page=featured")
        }else{
            url = 'dashboard/curator-artworks?limit=7&page='+page;
            setUrl("/curator/"+curator.id);
        }
        axios.get(url)
            .then((res) => {
                  if(type == 2){
                    let {artworks} = res.data.data;
                    setArtworks(artworks);      
                  }
                  else{
                    let {data} = res;
                    setArtworks(data);      
                  }
                           
            })
    }
    return (<>
    <div className="row" id='forStickyPos'>
      <div className="col-8 col-md-4">
      <ul className="trendMenu">
                {/* <li className={grid == 0 ? "active" : ""}><a href="#" onClick={e => {handleType(e,0,1);myGrid.current.scrollIntoView({behavior: 'smooth', block: 'center'})}} >trending</a></li> */}
                <li className={grid == 1 ? "active" : ""}><a href="#" onClick={e => {handleType(e,1,1);myGrid.current.scrollIntoView({behavior: 'smooth', block: 'center'})}} >featured</a></li>
            </ul>
      </div>
      <div className='col-4 col-md-4'>
        <ul className="trendMenu fullWidth">
                <li className={grid == 2 ? "active lastPos" : "lastPos"}><a href="#" onClick={e => {handleType(e,2,1); myGrid.current.scrollIntoView({behavior: 'smooth', block: 'center'})}} >curators <span>choice made by <span classname='author'>{curator.name} {curator.lastname}</span></span></a></li>
            </ul>
      </div>
   
    </div>
        <div className="row for3Col" ref={myGrid} >
            <div className='col-12 forMobileBigArt'>
                    {artworks.data ? (
                    <ProductBlock
                    start={0}
                    limit={1}
                    data={artworks.data}
                    />
                    ) : null}
                             
            </div>
            <div className='col-6 col-md-4'>
                    {artworks.data ? (
                    <ProductBlock
                    start={show==4 ? 0 : 1}
                    limit={show==4 ? 2 : 3}
                    data={artworks.data}
                    />
                    ) : null}
                             
            </div>
            <div className='col-6 col-md-4'>
        
          
                    {artworks.data.length ? (
                    <ProductBlock
                    start={show==4 ? 2 : 4}
                    limit={show==4 ? 2 : 4}
                    data={artworks.data}
                    />
                    ) : null}
        
               
              
            </div>
            <div className='col-md-4 hideLast'>
               
           
                    {artworks.data.length ? (
                    <ProductBlock
                    start={4}
                    limit={2}
                    data={artworks.data}
                    />
                    ) : null}
               
            </div>

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

        <div className="row" id="forStick2">
          <div className='col-12'>
            <div className="trendMenu allMenu">
              <div className={category == 0 ? "trendBlock active" : "trendBlock"}><Link to="/store" onClick={(e)=>{handleCategory(e,0,1)}}>all art</Link></div>
              {cats.map(item => {
                return <div className={category == item.id ? "trendBlock active" : "trendBlock"}><Link to="#" onClick={(e)=>{handleCategory(e,item.id,1);myCats.current.scrollIntoView({behavior: 'smooth'})}}>{item.title}</Link></div>
              })}
            </div>
          </div>
        </div>
        <div className="row stSecond" id="galP2" ref={myCats}>
        
        <div className='col-6 col-lg-3 col-md-4'>
         {category_products.data.length ? (
                    <ProductBlock
                    start={0}
                    limit={show}
                    data={category_products.data}
                    />
                    ) : null}
        </div>
        <div className='col-6 col-lg-3 col-md-4'>
        {category_products.data.length ? (
                    <ProductBlock
                    start={show}
                    limit={show}
                    data={category_products.data}
                    />
                    ) : null}          
        </div>
        <div className='col-lg-3 col-md-4 hideLast'>
        {category_products.data.length ? (
                    <ProductBlock
                    start={2*show}
                    limit={show}
                    data={category_products.data}
                    />
                    ) : null}        
        </div>
        <div className='col-lg-3 removeLg'>
        {category_products.data.length ? (
                    <ProductBlock
                    start={3*show}
                    limit={show}
                    data={category_products.data}
                    />
                    ) : null}        
        </div>
      </div>
      <div className="row productPaginate">
                <div className='col-3 prevPage'>
                    <a to="#" onClick={e => { if(category_products.current_page -1 < category_products.last_page && category_products.current_page -1 != 0 ){ console.log('clicked'); handleCategory(e,category,category_products.current_page-1);} myCats.current.scrollIntoView({behavior: 'smooth', block: 'center'}) }}>PREV</a>
                </div>
                <div className='col-6 centerPage'>
                <Link to="/store">ALL ARTWORKS</Link>
                </div>
                <div className='col-3 nextPage '>
                <a to="#" onClick={e => { if(category_products.current_page +1 < category_products.last_page){ handleCategory(e,category,category_products.current_page+1); } myCats.current.scrollIntoView({behavior: 'smooth'})}}>NEXT</a>
                </div>
            </div></>
    )
}