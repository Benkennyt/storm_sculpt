import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./app/stores/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
