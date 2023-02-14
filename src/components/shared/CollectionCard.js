import React from "react";
import { Link } from "react-router-dom";

function CollectionCard({ id, img, collection_name }) {
  return (
    <div className="slickFull">
      <Link to={"/collections/" + id} style={{ position: "relative" }}>
        <div className="img">
          <img
            alt={collection_name}
            src={img.replace(
              "https://api.riabid.ge/storage/artworks/",
              "https://api.riabid.ge/storage/artworks/thumbnail_"
            )}
          ></img>
        </div>
      </Link>
    </div>
  );
}

export default CollectionCard;
