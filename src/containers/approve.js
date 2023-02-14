import React, { useState } from "react";

function Approve(props) {
  const [title, setTitle] = useState("");

  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  return (
    <section id="shop" className="container">
      <div className="contact-container">
        <div className="bread" style={{ gridArea: "beard" }}>
          {/* home / shop */}
        </div>
        <h1 style={{ textAlign: "center", color: "red" }}>
          Confirmation email sent. Please confirm your email address.
        </h1>
      </div>
    </section>
  );
}

export default Approve;
