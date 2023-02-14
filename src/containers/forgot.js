import React, { useState } from "react";
import Filter from "../components/shop/Filter";
import CardGrid from "../components/shop/CardGrid";
import { GoSettings } from "react-icons/go";
import { changePass } from "../services/authService";
import { useMutation } from "react-query";
const queryString = require("query-string");

function Forgot(props) {
  const parsed = queryString.parse(props.location.search);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const changeMutation = useMutation(changePass, {
    onMutate: (variables) => {
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 };
    },
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {
      window.location.href = "/";
      // Boom baby!
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  return (
    <section id="shop" className="container">
      <div className="bread" style={{ gridArea: "beard" }}>
        {/* home / shop */}
      </div>
      <h1>Reset Password</h1>
      <div className="flex column">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="main-input"
          placeholder="New Password"
        ></input>
        <input
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          type="password"
          className="main-input"
          placeholder="Confirm Password"
        ></input>
        <input
          onClick={() => {
            changeMutation.mutate({ token: parsed.token, password });
          }}
          style={{ width: "100%" }}
          type="submit"
          className="btn-placebid"
          value="Change Password"
        ></input>
      </div>
    </section>
  );
}

export default Forgot;
