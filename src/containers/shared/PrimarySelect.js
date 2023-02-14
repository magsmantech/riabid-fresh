import React from "react";

export default function PrimarySelect({ formik, id, placeholder, data }) {
  return (
    <select
      onChange={formik.handleChange}
      name={id}
      id={id}
      defaultValue={formik.values[id]}
    >
      <option value="0">{placeholder}</option>
      {data.map((item, index) =>
        (
          id === "artist_id"
            ? formik.values[id] === item.id
            : formik.values[id] === index + 1
        ) ? (
          <option
            key={item.id}
            selected
            value={id === "artist_id" ? item.id : index + 1}
          >
            {id === "artist_id" ? item.display_name : item}
          </option>
        ) : (
          <option
            key={item.id}
            value={id === "artist_id" ? item.id : index + 1}
          >
            {id === "artist_id" ? item.display_name : item}
          </option>
        )
      )}
    </select>
  );
}
