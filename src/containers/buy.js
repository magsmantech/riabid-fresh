import React from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import { MetaTags } from "react-meta-tags";

export default function Buy(props) {
  const [filter, setFilter] = React.useState(false);

  return (
    <section id="shop" className="container">
      <MetaTags>
        <title>Buying on Ria Bid</title>
        <meta
          name="description"
          content="Ria Bid features 24/7 online auctions and immediate purchases of paintings, prints, photographs, different mediums."
        />
        <meta
          name="keywords"
          content="contemporary, art, georgian, georgian arts, design, contemporary, modern,fine art,auctions,artists,georgian artists,online auctions,prints,artworks,buy art,photographs,buy art,artwork for sale,decorative art,Artwork made by the contemporary artists in the GeorgiansGeorgia contemporary art,art from georgia,Georgia's Contemporary Artists,contemporary artists from Georgia,Georgian artist works prices,where i cen see georgian artists?,"
        />
      </MetaTags>
      <div className="bread" style={{ gridArea: "beard" }}>
        {/* home / shop */}
      </div>
      <h1>Buying on Ria Bid</h1>
      <div className="grid-container-text">
        <div className="first">
          <li>
            Ria Bid features 24/7 online auctions and immediate purchases of
            paintings, prints, photographs, different mediums
          </li>
          <li>Ria Bid also offers fixed price with the 15% commission fee</li>
          <li>
            All artworks offered on the site have been evaluated by Ria Keburia
            Foundation team
          </li>
          <li>
            Each auction listing provides comprehensive information about the
            artwork, including a detailed description, provenance, condition.
          </li>
          <li>
            Bidding on RiaBid is easy. In order to bid on an artwork, register
            to become a buyer. Registration is simple and free of charge.
          </li>
          <li>
            Winning bidders receive step-by-step emails that guide them through
            the post auction process. The buyer pays the seller for the winning
            bid amount and taxes (if applicable), and arranges shipping using
            our partnered shippers or any shipper of their choice.
          </li>
          <li>
            The buyer pays a buyer’s premium on all winning transactions
            directly to Ria Bid. The premium is charged on the buyer’s credit
            card when the auction closes. Ria Bid collects a 15% buyer's premium
            on all lots
          </li>
          <li>
            The buyer is responsible for all shipping arrangements and payments
            to the shipper of their choice.
          </li>
          <li>
            If the buyer is unable to issue payment in the manner outlined
            above, it is the buyer’s obligation to negotiate a different
            arrangement for payment with the seller, at their discretion.
          </li>
          <li>
            If the winning bidder defaults on making payments to the seller,
            they may be blocked from bidding, or their account may be suspended
            by Ria Bid.
          </li>
        </div>
      </div>
    </section>
  );
}
