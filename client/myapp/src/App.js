import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Check from "./checkComp/Check";
import LeftBar from "./components/DashboardComponents/LeftBar/LeftBar";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import TopBar from "./components/DashboardComponents/TopBar/TopBar";
import Dashboard from "./components/DashboardComponents/DashBoard/Dashboard";
import DashBoardLogin from "./components/DashboardComponents/DashBoardLogin/DashBoardLogin";
import Try from "./checkComp/Try";

function App() {
  return (
    <div>
      <Check />
      <div></div>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/DashboardLogin">
            <DashBoardLogin />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
