import React, { Component, Fragment } from "react";

import "./HomeStyle.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import TopBar from "../../WebsiteComponents/TopBar/TopBar";
import Login from "../Login/Login";
import Register from "../RegisterUser/Register";
import ViewProduct from "../View/ViewProduct";
import BuyProduct from "../BuyProduct/BuyProduct";
class Home extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <div>
            <TopBar />
          </div>

          <Route exact path="/">
            <ViewProduct />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route
            exact
            path="/product_Item/:id"
            render={(props) => <BuyProduct {...props} />}
          />
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default Home;
