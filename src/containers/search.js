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
import ProductBlock from "../components/shared/ProductBlock";

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

  return (
    <section>
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

    <div className="searchPage">
      <div className="row">
        <div className="col-md-4">
          <h1>Search Results for {params.search}</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <h2>artists</h2>
        </div>
        {data && data.data && data.data.artists ? data.data.artists.map((item) =>
            item.has_artwork ? (
              <div className="col-md-2"><Link
                style={{ color: "#d43e3e" }}
                key={item.id}
                to={"/artists/" + item.id}
                className="artist"
              >
                {item.display_name}
              </Link></div>
            ) : (
              <div className="col-md-2"><Link key={item.id} to={"/artists/" + item.id} className="artist">
                {item.display_name}
              </Link></div>
            )
          ) : '' }
      </div>
      <div className="row">
        <div className="col-md-12">
            <h2 className="searchArtworks">artworks</h2>
        </div>
      </div>
        <div className="row "  >
            <div className='col-6 col-lg-3'>                         
                    {data?.data?.artworks ? (
                    <ProductBlock
                    start={0}
                    limit={Math.round((data?.data?.artworks.length)/4)}
                    data={data?.data?.artworks}
                    />
                    ) : null}
                             
            </div>
            <div className='col-6 col-lg-3'>
                         
                         {data?.data?.artworks ? (
                         <ProductBlock
                         start={Math.round(data?.data?.artworks.length/4)}
                         limit={Math.round(data?.data?.artworks.length/4)}
                         data={data?.data?.artworks}
                         />
                         ) : null}
                                  
                 </div>
                 <div className='col-6 col-lg-3'>
                         
                         {data?.data?.artworks ? (
                         <ProductBlock
                         start={2*(Math.round(data?.data?.artworks.length/4))}
                         limit={Math.round(data?.data?.artworks.length/4)}
                         data={data.data.artworks}
                         />
                         ) : null}
                                  
                 </div>
                 <div className='col-6 col-lg-3'>
                         
                         {data?.data?.artworks ? (
                         <ProductBlock
                         start={3*(Math.round(data?.data?.artworks.length/4))}
                         limit={Math.round(data?.data?.artworks.length/4)}
                         data={data.data.artworks}
                         />
                         ) : null}
                                  
                 </div>
          </div>
    </div>
  
    </section>
  );
}

export default Search;
