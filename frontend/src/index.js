import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reduxStore from "./reduxStore";
import { ThemeContextProvider } from "./context/ThemeContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={reduxStore}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
