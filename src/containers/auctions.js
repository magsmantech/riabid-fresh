import React from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import cardImg from "../assets/dummy/cardImage.jpg";
import { Link } from "react-router-dom";
import clock from "../assets/product/clock.png";
import { QueryClient, useQuery } from "react-query";
import { getAuctions } from "../services/auctionsService";
import Loading from "./loading";
import { MetaTags } from "react-meta-tags";
const queryClient = new QueryClient();

function Auctions(props) {
  const [filter, setFilter] = React.useState(false);
  const { isLoading, error, data } = useQuery("auctions", getAuctions, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  console.log(data.data);

  return (
    <section className="auctionPage">
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
  
    <div className="auctionTitle">      
        <h1>Auctions</h1>      
    </div>

    <div className="auctionBlocks upcomingBlock">
      <h2>upcoming</h2>
      <div className="row">
      {data.data.upcoming.map((item,key)=>{
        return <div className="col-md-6" key={key}><Link to={`/auctions/${item.id}`} className="aucBlock upComing">
                <img src={item.image} className="w-100" />
                <div className="row">
                  <div className="col-md-9">
                    <span className="auctionTitle">{item.name}</span>
                    <span className="date">{item.city} {item.date_formatted}</span>
                  </div>
                  <div className="col-md-3">
                    <span className="arrow">→</span>
                  </div>
                </div>
                </Link></div>
      })}
      </div>
    </div>

    <div className="auctionBlocks">
      <h2>previous</h2>
      <div className="row">
      {data.data.previous.map((item,key)=>{
        return <div className="col-md-4" key={key}><Link to={`/auctions/${item.id}`} className="aucBlock previousBlock">
                <img src={item.image} className="w-100" />
                <div className="row">
                  <div className="col-md-9">
                    <span className="auctionTitle">{item.name}</span>
                    <span className="date">{item.city} {item.date_formatted}</span>
                  </div>
                  <div className="col-md-3">
                    <span className="arrow">→</span>
                  </div>
                </div>
                </Link></div>
      })}
      </div>
    </div>
      
      
    </section>
  );
}

export default Auctions;
