import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import cardImg from "../assets/dummy/cart-dummy.png";
import { getBag } from "../services/bagService";
import { createOrder, removeItem } from "../services/dashboardService";
import Loading from "./loading";
import { toast } from "react-toastify";

export default function Cart() {
  const queryClient = useQueryClient();
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
      window.location.href =
        "https://api.riabid.ge/payorder/" + data.data.order_id;
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
    <section id="shop" className="container auctions">
      <ul class="breadcrumb">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
      <div className="grid-container-cart">
        {data.data.bag.length
          ? data.data.bag.map((item) => (
              <div key={item.id} className="item flex space-between">
                <div className="flex mob-flex">
                  <img
                    src={item.image.replace(
                      "https://api.riabid.ge/storage/artworks/",
                      "https://api.riabid.ge/storage/artworks/thumbnail_"
                    )}
                  ></img>
                  <div className="flex column">
                    <h3>{item.title}</h3>
                    <p>Product ID: {item.artwork_id}</p>
                  </div>
                </div>
                <div className="flex column space-between bet-mob">
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={() => removeMutation.mutate(item.id)}
                  >
                    Remove
                  </button>
                  <p className="price">
                    {item.on_auction
                      ? item.current_bid + "₾"
                      : item.is_geo
                      ? `₾${item.buy_it_now}`
                      : `$${item.price_usd}`}
                  </p>
                </div>
              </div>
            ))
          : "Your cart is empty"}

        <div className="full flex column">
          {data.data.address ? (
            <p>
              Address: {data.data.address.address_1}{" "}
              {data.data.address.address_2}
            </p>
          ) : null}
          {data.data.address ? (
            <p>Country: {data.data.address.country}</p>
          ) : null}
          {data.data.address ? <p>City: {data.data.address.city}</p> : null}
          {data.data.address ? <p>Mobile: {data.data.address.mobile}</p> : null}
          {data.data.address ? null : (
            <Link
              to="/dashboard/addaddress"
              style={{ color: "red", fontWeight: 400 }}
            >
              Please add address to your account
            </Link>
          )}
          {data.data.is_geo ? null : <p>Shipping 35$</p>}
          <h3>
            Full Amount:{" "}
            {data.data.is_geo
              ? `₾${data.data.total}`
              : `$${data.data.total_usd}`}
          </h3>
          <button onClick={() => orderMutation.mutate()}>Pay Now</button>
        </div>
      </div>
    </section>
  );
}
