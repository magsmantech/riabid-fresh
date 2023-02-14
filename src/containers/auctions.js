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

  return (
    <section id="shop" className="container auctions">
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
      <ul className="breadcrumb">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/auctions">Auctions ({data.data.length})</Link>
        </li>
      </ul>
      <div className="grid-container-auctions">
        {data.data.map((item) => (
          <div key={item.id} className="product flex column">
            <Link to={"/store/" + item.id}>
              <div className="img">
                <div className="group">
                <img src={item.image}></img>
                </div>
              </div>
            <div className="title_tag">
              <p className="title">
                <i>{item.title}</i>
              </p>
              <p className="title2">{item.display_name}</p>
              </div>
            </Link>
            {item.is_geo ? (
            <div className="flex space-between price_tag">
              <div className="flex">
                <p className="price auc-red">₾{item.current_bid}</p>
                <p className="price gray">₾{item.buy_it_now}</p>
                <img src={clock} className="clc" alt="Clock" />
              </div>
            </div>
            ):
            (
              <div className="flex space-between price_tag">
              <div className="flex">
                <p className="price auc-red">${item.current_bid_usd}</p>
                <p className="price gray">${item.buy_it_now_usd}</p>
                <img src={clock} className="clc" alt="Clock" />
              </div>
            </div>
            )}
            <p className="time gray">End time: {item.end_time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Auctions;
