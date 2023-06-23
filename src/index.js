import React from "react";
import ReactDOM from "react-dom";
import { hydrate, render } from "react-dom";

import App from "./App";

import {HelmetProvider} from "react-helmet-async";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <React.StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </React.StrictMode>,
    rootElement
  );
  //hydrate(<App />, rootElement);
} else {
  render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>,
    rootElement
  );
  //render(<App />, rootElement);
}