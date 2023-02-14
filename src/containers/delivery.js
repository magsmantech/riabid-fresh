import React from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import { MetaTags } from "react-meta-tags";

function Delivery(props) {
  const [filter, setFilter] = React.useState(false);

  return (
    <section id="shop" className="container">
      <MetaTags>
        <title>Delivery on Ria Bid</title>
        <meta
          name="description"
          content="WE DELIVER WITHIN GEORGIA AND WORLDWIDE."
        />
        <meta
          name="keywords"
          content="contemporary, art, georgian, georgian arts, design, contemporary, modern,fine art,auctions,artists,georgian artists,online auctions,prints,artworks,buy art,photographs,buy art,artwork for sale,decorative art,Artwork made by the contemporary artists in the GeorgiansGeorgia contemporary art,art from georgia,Georgia's Contemporary Artists,contemporary artists from Georgia,Georgian artist works prices,where i cen see georgian artists?,"
        />
      </MetaTags>
      <div className="bread" style={{ gridArea: "beard" }}>
        {/* home / shop */}
      </div>
      <h1>Delivery</h1>
      <div className="grid-container-text">
        <div className="first">
          <p>
            WE DELIVER WITHIN GEORGIA AND WORLDWIDE. PLEASE NOTE, FOR ORDERS
            OUTSIDE OF GEORGIA YOU MAY BE REQUIRED TO PAY INTERNATIONAL CUSTOMS
            DUTIES AND LOCAL SALES TAX ON RECEIPT OF YOUR ORDER.
          </p>
          <p>
            Ria Bids delivery partners are at your disposal. Whether it’s a
            courier or one of our dedicated delivery drivers, we deliver,
            handpicked artwork direct to your door.
          </p>
          <p>
            {" "}
            We will always contact soon After you place your order and will
            inform you if your delivery is delayed for any reason and endeavor
            to send your artwork out as fast as possible.
          </p>
          <p>Reasons of the delay:</p>
          <ul>
            <li>- weather conditions</li>
            <li>-temporal border closures</li>
            <li>-improper documentations</li>
          </ul>
          <p>Average delivery time once payment has cleared our account:</p>
          <p>Within GE: 2-5 working days</p>
          <p>International Delivery: 6-14 working days</p>
        </div>
      </div>
    </section>
  );
}

export default Delivery;
