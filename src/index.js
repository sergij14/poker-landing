import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loader from "./Loader";

const RootApp = (
  <BrowserRouter>
    <Suspense
      fallback={
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      }
    >
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/:id" component={App} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

ReactDOM.render(RootApp, document.getElementById("root"));
