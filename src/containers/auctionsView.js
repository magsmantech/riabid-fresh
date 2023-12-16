import React from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import cardImg from "../assets/dummy/cardImage.jpg";
import { Link } from "react-router-dom";
import clock from "../assets/product/clock.png";
import { QueryClient, useQuery } from "react-query";
import { getAuctions,getAuction } from "../services/auctionsService";
import Loading from "./loading";
import { MetaTags } from "react-meta-tags";
import AuctionBlock from "../components/shared/AuctionBlock";
const queryClient = new QueryClient();

function Auctions(props) {
  const [filter, setFilter] = React.useState(false);
  const [show, setShow] = React.useState(3); 
  const [boxLength, setBoxLength] = React.useState([]);
  const [artworks, setArtworks] = React.useState(false);
  const [sort,setSort] = React.useState({'sort':'price','price_order':'desc','lot_order':'asc'});

  function handleResize() {
    if(window.innerWidth > 768)
      setShow(3);
    else 
      setShow(2);
  }

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize)
    return () =>{
      window.removeEventListener('resize', handleResize)
    }
  },[])

  const { isLoading, error, data } = useQuery(
    "auctions" + props.match.params.index,
    () => getAuction(props.match.params.index),
    {
      refetchOnWindowFocus: false,
    }
  );

  React.useEffect(()=>{
    if(data?.data){
      let arr = divideBoxIntoColumns(data?.data?.current[0]?.artworks?.length,show);
      setBoxLength(arr)
      setArtworks(data?.data?.current[0]?.artworks);
    }
  },[data])


  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;


  function divideBoxIntoColumns(boxWidth,columns) {
    const columnWidth = Math.floor(boxWidth / columns);
    const remainder = boxWidth % columns;
    return [columnWidth + (remainder > 0 ? 1 : 0), columnWidth + (remainder > 1 ? 1 : 0), columnWidth];
  }

  function changeSort(name){
    let lot_order = sort.lot_order;
    let price_order = sort.price_order;
    if (name == 'lot'){
      if(sort.lot_order == 'asc'){
        lot_order = 'desc';        
        artworks.sort((a, b) => a.lot_number - b.lot_number);
      }else{
        lot_order = 'asc';
        artworks.sort((a, b) => b.lot_number - a.lot_number);
      }
    }else{
      if(sort.price_order == 'asc'){
        price_order = 'desc';        
        artworks.sort((a, b) => a.sold_for - b.sold_for);
      }else{
        price_order = 'asc';
        artworks.sort((a, b) => b.sold_for - a.sold_for);
      }
    }
    setSort({'sort':name,'price_order':price_order,'lot_order':lot_order})

  }


  return (
    <section className="auctionPageShow">
      <MetaTags>
        <title>
          Buy and Sell Contemporary and Modern Art | Ria Bid Auctions
        </title>
        <meta
          name="description"
          content="Find the art here. Purchase desired works. Browse and bid on paintings, prints, photos, and more by the Riabid. leading Georgian artists in curated online auctions."
        />
        <meta
          name="keywords"
          content="Georgian painters,artwork for sale, art from georgia,  Tbilisi art, Landing Pages, artists from Tbilisi, contemporary artists from Georgia,Georgian artist works,i wants see georgian contemporary artists,"
        />
      </MetaTags>
    <div className="row">
        <div className="col-md-4">
            <div className="auctionTitleShow">      
                <h1>{data.data.current[0].name}</h1>      
                <div className="location mobLocation">
                {data.data.current[0].date_formatted}  {data.data.current[0].address}<br/>
                  {data.data.current[0].city}
                </div>

                <div className="text" dangerouslySetInnerHTML={{__html: data.data.current[0].description}}>
                </div>
            </div>
        </div>
        <div className="offset-md-1 col-md-2 location mobHide">
     {data.data.current[0].date_formatted}     {data.data.current[0].city}<br/>
        {data.data.current[0].address}
        </div>
        <div className="offset-md-1 col-md-1">
            <a href={data.data.current[0].additional_file} target="_BLANK" className="download">download pdf</a>
        </div>
    </div>

    <div className="row auctionMargin">
        <div className="col-md-3 mobHide">
          <span className="desc">artworks</span>
          
          <span className="prevCols">previous</span>

          <div className="prevDivs">
            {data.data.previous.map(item => {
                return <Link to={`/auctions/${item.id}`} className="prevLinks"><span className="black">{item.name} →</span>{item.city}  {item.date_formatted}</Link>
            })}
              

          </div>
          </div>
        <div className="row  col-md-9">
            <div className="results displayHide col-6">
              results
            </div>
            <div className="col-3 col-md-1">
                <span onClick={e=>{changeSort('lot')}} className={sort.sort == 'lot' ? "sort active" : "sort"}>by lot № <span className="arrow">{sort.lot_order == 'asc' ? "↑" : "↓"}</span></span>
            </div>
            <div className="col-3 col-md-1 priceSort">
                <span onClick={e=>{changeSort('price')}} className={sort.sort == 'price' ? "sort active" : "sort"}>by price <span className="arrow">{sort.price_order == 'asc' ? "↑" : "↓"}</span></span>
            </div>
            <div className="offset-md-10"></div>

        <div className="col-6 col-md-4">
          {artworks && boxLength.hasOwnProperty(0) && <AuctionBlock
                    start={0}
                    limit={boxLength[0]}
                    data={artworks}
                    /> }
        </div>
        
        <div className="col-6 col-md-4">
            {artworks && boxLength.hasOwnProperty(0) && <AuctionBlock
                    start={boxLength[0]}
                    limit={boxLength[1]}
                    data={artworks}
                    /> }
        </div>
        
        <div className="col-6 col-md-4">
            {artworks && boxLength.hasOwnProperty(0) && <AuctionBlock
                    start={boxLength[0]+boxLength[1]}
                    limit={boxLength[2]}
                    data={artworks}
                    /> }
        </div>

       
            
        </div>
    </div>
     

     <div className="displayHide">
     <span className="prevEvents">previous events</span>

<div className="prevDivs">
  {data.data.previous.map(item => {
      return <Link to={`/auctions/${item.id}`} className="prevLinks"><span className="black">{item.name} →</span>{item.city}  {item.date_formatted}</Link>
  })}
    

</div>
     </div>
      
    </section>
  );
}

export default Auctions;
