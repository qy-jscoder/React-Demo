import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
// import WithCounter from "./container/withCounter";
import { BrowserRouter } from "react-router-dom";
import GetAllRoutes from "./router/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GetAllRoutes />
    </BrowserRouter>
  </Provider>
);
