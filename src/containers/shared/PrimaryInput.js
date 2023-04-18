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
       {formik.errors[id] && formik.touched[id] && (
        <div className="formError">{formik.errors[id]}</div>
      )}
    </div>
  );
}
