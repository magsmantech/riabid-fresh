import React from "react";

export default function PrimaryInput({
  id,
  type = "text",
  formik,
  placeholder,
  ...rest
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {formik.errors[id] && formik.touched[id] && (
        <div style={{ color: "red" }}>{formik.errors[id]}</div>
      )}
      <input
        min={1}
        value={formik.values[id]}
        onChange={formik.handleChange}
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        {...rest}
      ></input>
    </div>
  );
}
