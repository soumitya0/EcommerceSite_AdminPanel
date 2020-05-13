import React, { Component, Fragment, useState } from "react";

import "./HomeStyle.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import TopBar from "../../WebsiteComponents/TopBar/TopBar";
import Login from "../Login/Login";
import Register from "../RegisterUser/Register";
import ViewProduct from "../View/ViewProduct";
import BuyProduct from "../BuyProduct/BuyProduct";
import Thankyou from "../Thankyou/Thankyou";
const Home = () => {
  const [data, setData] = useState(0);

  // SearchData
  const getData = (val) => {
    console.log(val, "home");
    setData(val);
  };

  return (
    <Fragment>
      <BrowserRouter>
        <div>
          <TopBar sendData={getData} />
        </div>

        <Route exact path="/">
          <ViewProduct searchData={data} search={true} />
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

        <Route exact path="/payment-complete">
          <Thankyou />
        </Route>
      </BrowserRouter>
    </Fragment>
  );
};

export default Home;
