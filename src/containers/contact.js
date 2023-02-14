import React, { useState } from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import { useMutation } from "react-query";
import { contact } from "../services/dashboardService";
import { toast } from "react-toastify";
import { MetaTags } from "react-meta-tags";
import map from "../assets/images/map.png";

function Contact(props) {
  const [filter, setFilter] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  const contactMutation = useMutation(contact, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.context);
    },
    onSuccess: (data, variables, context) => {
      toast.dark("You successfully sent information", {
        progress: undefined,
        hideProgressBar: true,
      });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
      setTitle("");
      setEmail("");
      setDescription("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    contactMutation.mutate({ name: title, email, description });
  };

  return (
    <section id="shop" className="container">
      <MetaTags>
        <title>Ria Bid | Contact Us</title>
        <meta name="description" content="Do you have any questions?!" />
        <meta
          name="keywords"
          content="contemporary, art, georgian, georgian arts, design, contemporary, modern,fine art,auctions,artists,georgian artists,online auctions,prints,artworks,buy art,photographs,buy art,artwork for sale,decorative art,Artwork made by the contemporary artists in the GeorgiansGeorgia contemporary art,art from georgia,Georgia's Contemporary Artists,contemporary artists from Georgia,Georgian artist works prices,where i cen see georgian artists?,"
        />
      </MetaTags>

      <div className="contact-container">
        <div className="bread" style={{ gridArea: "beard" }}>
          {/* home / shop */}
        </div>
        <div className="contact-grid">
          <div className="item br">
            <h1 className="contact-heading">GET IN TOUCH</h1>
            <div className="contact-details">
              <p>Got a question? Take a look at our Map bellow</p>
              <p>Need help with orders, services or press enquiries?</p>
              <p>
                Email: <b>help@riabid.ge</b>
              </p>
              <p>
                Phone: <b>+995599200535</b>
              </p>
            </div>
          </div>

          <div className="item br">
            <h1 className="contact-heading">COME SEE US</h1>
            <div className="contact-details">
              <p>
                If you would like to see an artwork in person, visit our Gallery
                Showroom at Ambassadori Golf Club Resort . Our gallery address
                located here:
              </p>
              <p> GEORGIA, GURJAANI REGION, VILLAGE KACHRETI, SANGALI</p>
            </div>
          </div>

          <div className="item br">
            <h1 className="contact-heading">ADDITIONAL INFORMATION</h1>
            <div className="contact-details">
              <p>
                <b>INTERMEDIARY BANK:</b> COMMERZBANK, FRANKFURT, GERMANY;
                SWIFT: COBADEFF
              </p>
              <p>
                <b>ACCOUNT WITH INSTITUTION:</b> BANK OF GEORGIA, SWIFT:
                BAGAGE22; 29A GAGARIN STREET, TBILISI 0160,
              </p>
              <p>
                <b>GEORGIA BENEFICIARY:</b> NCLE RIA KEBURIA FOUNDATION
              </p>
              <p>
                <b>ACCOUNT:</b> GE11BG0000000131281382
              </p>
            </div>
          </div>

          <div className="item br">
            <h1 className="contact-heading">NCLE RIA KEBURIA FOUNDATION</h1>
            <div className="contact-details">
              <p>
                <b>IDENTIFICATION NUMBER:</b> 427737666
              </p>
              <p>
                <b>LEGAL ADDRESS:</b> GEORGIA, GURJAANI REGION, VILLAGE
                KACHRETI, SANGALI
              </p>
              <p>
                <b>E-MAIL:</b> ARTRESIDENCE@RIAKEBURIA.COM
              </p>
              <p>
                <b>TEL:</b> (995) 599 200 535
              </p>
            </div>
          </div>

          <div className="item">
            <h1 className="contact-heading">CHECK OUR MAP</h1>
            <img className="map-image" src={map} />
          </div>

          <div className="item">
            <h1 className="contact-heading">CONTACT US</h1>

            <form onSubmit={handleSubmit} className="contact-form">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Name"
              ></input>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="E-Mail"
              ></input>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                placeholder="Description"
              ></textarea>
              <input
                style={{ cursor: "pointer" }}
                type="submit"
                value="Send Message"
              ></input>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
