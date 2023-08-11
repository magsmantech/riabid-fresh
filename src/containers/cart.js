import React,{useState} from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import cardImg from "../assets/dummy/cart-dummy.png";
import { getBag } from "../services/bagService";
import { createOrder, removeItem } from "../services/dashboardService";
import Loading from "./loading";
import { toast } from "react-toastify";
import ProductBlock from "../components/shared/ProductBlock";
import { editAddress, getAddress } from "../services/dashboardService";
import { getMyBiography, addBiography, updateBiography } from "../services/dashboardService";

export default function Cart() {
  
  const [title, setName] = useState("");
  const [address_1, setAddressOne] = useState("");
  const [address_2, setAddressTwo] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [iban, setIban] = useState("");
  const queryClient = useQueryClient();

  let bio = useQuery("bio", getMyBiography, {refetchOnWindowFocus: false,});
  if (!title && bio.data){
    setName(bio.data.data.artist_name);
  }

  const orderMutation = useMutation(createOrder, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.context);
    },
    onSuccess: (data, variables, context) => {
      toast.dark("You successfully created order", {
        progress: undefined,
        hideProgressBar: true,
      });
      window.location.href = "https://api.riabid.com/payorder/" + data.data.order_id;
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const removeMutation = useMutation(removeItem, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.context);
    },
    onSuccess: (data, variables, context) => {
      toast("You successfully removed item");
      queryClient.invalidateQueries("bag");
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
  const { isLoading, error, data } = useQuery("bag", getBag, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;
  return (
    <section className="cartPage paddingLeft">
      <div className="row">
        <div className="col-md-3">
          <h1>Cart</h1>

          <div className="shipInfo">
 
                  <div className="form">
                  
            <input
              value={title}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="full_name"
              placeholder={"Full Name"}
            ></input>
            <input
              value={address_1}
              onChange={(e) => setAddressOne(e.target.value)}
              type="text"
              name="address_one"
              placeholder={"Address Line 1"}
            ></input>
            <input
              value={address_2}
              onChange={(e) => setAddressTwo(e.target.value)}
              type="text"
              name="address_two"
              placeholder={"Address Line 2"}
            ></input>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              name="country"
              placeholder={"Country"}
            ></input>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              name="city"
              placeholder={"City"}
            ></input>
            <input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              type="text"
              name="zip"
              placeholder={"Zip/Postal Code"}
            ></input>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              name="phone"
              placeholder={"Phone Number"}
            ></input>
            <input
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              type="text"
              name="iban"
              placeholder={"IBAN number"}
            ></input>

           
        
                    </div>

                    <div className="checkout">
                      <h1>checkout</h1>
                      <p>artworks <span>{data.data.total} $</span></p>
                      <p>shipping <span>70 $</span></p>

                    <p className="total_amount">total amount <span>{data.data.total + 70} $</span></p>

                      <button className='payNow' onClick={() => orderMutation.mutate()}>PAY NOW</button>
                    </div>
                 
          </div>
        </div>
        <div className='col-md-9'>
          <div className='row'>
           
            {data.data.bag ? (
                      <ProductBlock
                      start={0}
                      limit={2}
                      data={data.data.bag}
                      col={4}
                      remove={true}
                      />
                      ) : null}
       
           
          </div>
        </div>
      </div>
     
    </section>
  );
}
