import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";
import Loader from "./components/Loader";

const RootApp = (
  <Suspense
    fallback={
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    }
  >
    <App />
  </Suspense>
);

ReactDOM.render(RootApp, document.getElementById("root"));
