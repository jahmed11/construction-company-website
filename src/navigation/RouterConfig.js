import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ViewModel from "../pages/viewModel/index";

import Home from "../pages/Home";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/model/:fulladdress/:id" component={ViewModel} />
    </Switch>
  );
}

// public routes
