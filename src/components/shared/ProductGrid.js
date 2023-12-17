import React, { useEffect, useState, useRef} from "react";
import ProductBlock from "./ProductBlock";
import AuctionBlock from "./AuctionBlock";
import { Link } from "react-router-dom";
import Loading from "../../containers/loading";
import axios from '../../lib/axios';
import {cats} from '../../containers/artwork/cats'
import { QueryClient, useQuery } from "react-query";
import { getAuctions } from "../../services/auctionsService";

export default function ProductGrid(){

    const [curator, setCurator] = useState({'id':null,'name':null,'lastname':null}); 
    const [artworks,setArtworks] = useState({'data':[]});
    const [category_products,setCategoryProducts] = useState({'data':[]});
    const [url,setUrl] = useState('');
    const [category,setCategory] = useState(0);
    const [grid, setGrid] = useState(0);
    const [show, setShow] = useState(4);  
    const [showSecond, setShowSecond] = useState(3);  
    const myGrid = useRef(null);
    const myCats = useRef(null); 


    const [boxLength, setBoxLength] = React.useState([]);
    const [boxLengthSecond, setBoxLengthSecond] = React.useState([]);

    const { isLoading, error, data } = useQuery("auctions", getAuctions, {
      refetchOnWindowFocus: false,
    });

    
    function handleResize() {
      if(window.innerWidth > 768){
        setShow(4);
        setShowSecond(3);
      }
      else {
        setShow(2);
        setShowSecond(2);
      }
    }

    React.useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize)
      return () =>{
        window.removeEventListener('resize', handleResize)
      }
    },[])

    function divideBoxIntoColumns(boxWidth,columns) {

      const columnWidth = Math.floor(boxWidth / columns);
      const remainder = boxWidth % columns;
      
      return [columnWidth + (remainder > 0 ? 1 : 0), columnWidth + (remainder > 1 ? 1 : 0), columnWidth + (remainder > 2 ? 1 : 0), columnWidth];
    }



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

       

            axios.get('artworks-paginated?limit=16')
            .then((res) => {
                  let data = res.data;
                  setCategoryProducts(data);
                  let arr = divideBoxIntoColumns(data?.data?.length,show);
                  setBoxLength(arr)
                  setCategoryProducts(data);
            });
        },[])

        useEffect(()=>{
          if(data?.data){
            
          let arr = divideBoxIntoColumns(data?.data?.previous[0]?.artworks?.length,showSecond);
          setBoxLengthSecond(arr)
          setArtworks(data?.data?.previous[0]?.artworks);
        }
        },[data?.data])

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
                  let arr = divideBoxIntoColumns(data?.data?.length,show);
                  
                  setBoxLength(arr)
                  setCategoryProducts(data);
            });
    }

    function handleType(e, type,page){    
        e.preventDefault();
        setGrid(type);
        let url;
        if (type == 0){
            
          let arr = divideBoxIntoColumns(data?.data?.previous[0]?.artworks?.length,showSecond);
          setBoxLengthSecond(arr)
          setArtworks(data?.data?.previous[0]?.artworks);

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
                    let {artworks,curator} = res.data.data;
                    setArtworks(artworks);     
                    setCurator(curator); 
                  }
                  else{
                    let {data} = res;
                    setArtworks(data);      
                  }
                           
            });
    }


    if (isLoading) return <Loading></Loading>;

    if (error) return "An error has occurred: " + error.message;




    return (<>
    <div className="row" id='forStickyPos'>
    <div className="col-4 col-md-4">
      <ul className="trendMenu fullWidth">
                <li className={grid == 0 ? "active" : ""}><a href="#" onClick={e => {handleType(e,0,1);myGrid.current.scrollIntoView({behavior: 'smooth', block: 'center'})}} >Auctions<span>{data?.data?.previous[0]?.date_formatted}</span></a></li>
            </ul>
      </div>
      <div className='col-4 col-md-2'>
        <ul className="trendMenu fullWidth">
                <li className={grid == 2 ? "active lastPos" : "lastPos"}><a href="#" className="mobCenter" onClick={e => {handleType(e,2,1); myGrid.current.scrollIntoView({behavior: 'smooth', block: 'center'})}} >curators <span className="curatorChoiceHide">choice made by <span className='author' onClick={e => {e.preventDefault(); window.location.href = "/curator/"+curator.id}}>{curator.name} {curator.lastname}</span></span></a></li>
            </ul>
      </div>
      <div className="col-4 col-md-2">
      <ul className="trendMenu float-right">
                {/* <li className={grid == 0 ? "active" : ""}><a href="#" onClick={e => {handleType(e,0,1);myGrid.current.scrollIntoView({behavior: 'smooth', block: 'center'})}} >trending</a></li> */}
                <li className={grid == 1 ? "active" : ""}><a href="#" onClick={e => {handleType(e,1,1);myGrid.current.scrollIntoView({behavior: 'smooth', block: 'center'})}} >featured</a></li>
            </ul>
      </div>
   
   
    </div>
        <div className="row for3Col" ref={myGrid} >
            <div className={grid == 0 ? "auctionPageShow col-12 forMobileBigArt" : "col-12 forMobileBigArt"}>
                    {grid != 0 &&  artworks?.data &&
                    <ProductBlock
                    start={0}
                    limit={1}
                    data={artworks?.data}
                    type={1}
                    /> }

{grid == 0 &&  artworks?.length &&
                    <AuctionBlock
                    start={0}
                    limit={1}
                    data={artworks}
                    />
                    }
                             
            </div>
            <div className={grid == 0 ? 'auctionPageShow col-6 col-md-4' : 'col-6 col-md-4'} >
                    {grid != 0 && artworks?.data &&
                    <ProductBlock
                    start={show==4 ? 0 : 1}
                    limit={show==4 ? 2 : 3}
                    data={artworks.data}
                    type={1}
                    />}

{grid == 0 &&  artworks?.length && boxLengthSecond.hasOwnProperty(0)  &&
                    <AuctionBlock
                    start={show==4 ? 0 : 1}
                    limit={ boxLengthSecond[0] }
                    data={artworks}
                    />
                   }
                             
            </div>
            <div className={grid == 0 ? "auctionPageShow col-6 col-md-4" : "col-6 col-md-4"}>
          
                    {grid != 0 &&  artworks?.data?.length  &&
                    <ProductBlock
                    start={show==4 ? 2 : 4}
                    limit={show==4 ? 2 : 4}
                    data={artworks?.data}
                    type={1}
                    />}

{grid == 0 && artworks?.length && boxLengthSecond.hasOwnProperty(0) && <AuctionBlock
                    start={show ==4 ? boxLengthSecond[0] :  boxLengthSecond[0]+1 }
                    limit={boxLengthSecond[1]}
                    data={artworks}
                    /> }
        
               
              
            </div>
            <div className={grid == 0 ? "auctionPageShow col-md-4 hideLast" : "col-md-4 hideLast"}>
               
           
                    {grid != 0 && artworks?.data?.length  &&
                    <ProductBlock
                    start={4}
                    limit={2}
                    data={artworks.data}
                    type={1}
                    />
                 }


{grid == 0 && artworks?.length && boxLengthSecond.hasOwnProperty(0) && <AuctionBlock
                    start={boxLengthSecond[0]+boxLengthSecond[1]}
                    limit={boxLengthSecond[2]}
                    data={artworks}
                    /> }
               
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

        { category_products.data.length && boxLength.hasOwnProperty(0) && <ProductBlock
                    start={0}
                    limit={boxLength[0]}
                    data={category_products.data}
                    /> }

    
        </div>
        <div className='col-6 col-lg-3 col-md-4'>
         {category_products.data.length && boxLength.hasOwnProperty(0) && <ProductBlock
                    start={boxLength[0]}
                    limit={boxLength[1]}
                    data={category_products.data}
                    /> }       
        </div>
        <div className='col-lg-3 col-md-4 hideLast'>
        {category_products.data.length && boxLength.hasOwnProperty(0) && <ProductBlock
                    start={boxLength[0]+boxLength[1]}
                    limit={boxLength[2]}
                    data={category_products.data}
                    /> }      
        </div>
        <div className='col-lg-3 removeLg'>
        {category_products.data.length && boxLength.hasOwnProperty(0) && <ProductBlock
                    start={boxLength[0]+boxLength[1]+boxLength[2]}
                    limit={boxLength[3]}
                    data={category_products.data}
                    /> }           
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