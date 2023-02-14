import React from "react";
import Card from "../shared/Card";
import cardImg from "../../assets/dummy/cardImage.jpg";
import { useQuery } from "react-query";
import { getArtworks } from "../../services/artworksService";
function CardGrid({ auction }) {
  const dummy = [
    {
      img: cardImg,
      type: auction ? "auction" : "sale",
      name: "Holmustund",
      price: "$699.99",
      secondParam: auction ? "0 Bids" : null,
    },
    {
      img: cardImg,
      type: auction ? "auction" : "sale",
      name: "Holmustund",
      price: "$699.99",
      secondParam: auction ? "0 Bids" : "$999.99",
    },
    {
      img: cardImg,
      type: auction ? "auction" : "sale",
      name: "Holmustund",
      price: "$699.99",
      secondParam: auction ? "10 Bids" : null,
    },
    {
      img: cardImg,
      type: auction ? "auction" : "sale",
      name: "Holmustund",
      price: "$699.99",
      secondParam: auction ? "7 Bids" : null,
    },
    {
      img: cardImg,
      type: auction ? "auction" : "sale",
      name: "Holmustund",
      price: "$699.99",
      secondParam: auction ? "0 Bids" : null,
    },
    {
      img: cardImg,
      type: auction ? "auction" : "sale",
      name: "Holmustund",
      price: "$699.99",
      secondParam: auction ? "0 Bids" : "$999.99",
    },
    {
      img: cardImg,
      type: auction ? "auction" : "sale",
      name: "Holmustund",
      price: "$699.99",
      secondParam: auction ? "0 Bids" : "$999.99",
    },
    {
      img: cardImg,
      type: auction ? "auction" : "sale",
      name: "Holmustund",
      price: "$699.99",
      secondParam: auction ? "0 Bids" : null,
    },
    {
      img: cardImg,
      type: auction ? "auction" : "sale",
      name: "Holmustund",
      price: "$699.99",
      secondParam: auction ? "0 Bids" : null,
    },
    {
      img: cardImg,
      type: auction ? "auction" : "sale",
      name: "Holmustund",
      price: "$699.99",
      secondParam: auction ? "0 Bids" : null,
    },
    {
      img: cardImg,
      type: auction ? "auction" : "sale",
      name: "Holmustund",
      price: "$699.99",
      secondParam: auction ? "0 Bids" : "$999.99",
    },
    {
      img: cardImg,
      type: auction ? "auction" : "sale",
      name: "Holmustund",
      price: "$699.99",
      secondParam: auction ? "0 Bids" : "$999.99",
    },
  ];
  const { isLoading, error, data } = useQuery("artworks", getArtworks, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  let items = data.data.map((i, k) => {
    return (
      <Card
        privileged={i.privileged}
        key={k}
        index={i.id}
        type={i.on_auction}
        name={i.title}
        img={"https://www.riabid.ge/static/media/cardImage.f1ffd350.jpg"}
        price={i.buy_it_now}
        secondParam={i.secondParam || undefined}
      />
    );
  });
  return <div className="grid-container">{items}</div>;
}

export default CardGrid;
