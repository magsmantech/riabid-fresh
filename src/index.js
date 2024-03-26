import React from "react";
import ReactDOM from "react-dom";
import { hydrate, render } from "react-dom";
import App from "./App";
import {HelmetProvider} from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google"


const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <GoogleOAuthProvider clientId='461264283798-6p4veeu84batj6s65lc37pc5hr75175m.apps.googleusercontent.com'>
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode></GoogleOAuthProvider>,
    rootElement
  );
  //hydrate(<App />, rootElement);
} else {
  render(
    <GoogleOAuthProvider clientId='461264283798-6p4veeu84batj6s65lc37pc5hr75175m.apps.googleusercontent.com'>
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode></GoogleOAuthProvider>,
    rootElement
  );
  //render(<App />, rootElement);
}