import React, { useState } from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import { useQuery } from "react-query";
import { getArtists, getSearch } from "../services/artistsService";
import { Link } from "react-router-dom";
import Loading from "./loading";
import queryString from "query-string";
import SharedSlider from "../components/shared/SharedSlider";
import { MetaTags } from "react-meta-tags";

function Search(props) {
  const [filter, setFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [letter, setLetter] = useState("");
  let params = queryString.parse(props.location.search);
  const { isLoading, error, data } = useQuery(
    "search",
    () => getSearch(params.search),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!params.search)
    return (
      <section id="shop" className="container">
        <div className="contact-container">
          <div
            className="artist-container"
            style={{ gridTemplateColumns: "1fr" }}
          >
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              style={{
                padding: "15px 22px",
                borderRadius: "40px",
                border: "1px solid #D8D8D8",
              }}
              placeholder="What are you looking for?"
              type="text"
            ></input>
            <a
              href={"/search?search=" + searchTerm}
              style={{
                padding: "15px 22px",
                border: "1px solid #D8D8D8",
                background: "#000",
                color: "#FFF",
                borderRadius: "40px",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              SEARCH
            </a>
          </div>
        </div>
      </section>
    );

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section id="shop" className="container auctions">
      <MetaTags>
        <title>Search Results for {params.search} | RiaBid</title>
        <meta
          name="description"
          content="Find the desired work on Riabid,Contemporary Georgian artists"
        />
        <meta
          name="keywords"
          content="contemporary, art, georgian, georgian arts, design, contemporary, modern,fine art,auctions,artists,georgian artists,online auctions,prints,artworks,buy art,photographs,buy art,artwork for sale,decorative art,Artwork made by the contemporary artists in the GeorgiansGeorgia contemporary art,art from georgia,Georgia's Contemporary Artists,contemporary artists from Georgia,Georgian artist works prices,where i cen see georgian artists?,"
        />
      </MetaTags>
      <h1 style={{ marginBottom: "10px", fontWeight: 300 }}>Artworks</h1>
      <div className="grid-container-auctions">
        {data.data.artworks.map((item) => (
          <div key={item.id} className="product flex column">
            <Link to={"/store/" + item.id}>
              <div className="img">
                <div className='group'>
                <img
                  src={item.thumbnail}
                ></img>
                </div>
              </div>
              <div class='title_tag'>
              <p className="title">
                <i>{item.title}</i>
              </p>
              <p className="title2">{item.display_name}</p>
              </div>
            </Link>
            <div className="flex space-between price_tag">
              <div className="flex">
                <p className="price">
                  {item.is_geo ? `₾${item.buy_it_now}` : `$${item.price_usd}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-container">
        <h1
          style={{ marginBottom: "10px", marginTop: "20px", fontWeight: 300 }}
        >
          Artists
        </h1>
        <div className="artist-container">
          {data.data.artists.map((item) =>
            item.has_artwork ? (
              <Link
                style={{ color: "#d43e3e" }}
                key={item.id}
                to={"/artists/" + item.id}
                className="artist"
              >
                {item.display_name}
                <br></br>
              </Link>
            ) : (
              <Link key={item.id} to={"/artists/" + item.id} className="artist">
                {item.display_name}
                <br></br>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Search;
