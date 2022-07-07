import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeContextProvider } from "./context/ThemeContext";
import reduxStore from "./reduxStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={reduxStore}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>
  </BrowserRouter>
);
