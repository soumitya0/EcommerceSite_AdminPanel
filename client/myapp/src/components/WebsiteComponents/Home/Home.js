import React, { Component, Fragment, useState } from "react";

import "./HomeStyle.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import TopBar from "../../WebsiteComponents/TopBar/TopBar";
import Login from "../Login/Login";
import Register from "../RegisterUser/Register";
import ViewProduct from "../View/ViewProduct";
import BuyProduct from "../BuyProduct/BuyProduct";
import Thankyou from "../Thankyou/Thankyou";
import Myorder from "../Myorder/Myorder";
import ProductView from "../../../common/components/client/ProductView/ProductView";
import CategoryList from "../../DashboardComponents/DashboardCategory/CategoryList.js/CategoryList";
import CategoryView from "../../../common/components/client/CategoryView/CategoryView";
import SlideShowDisplay from "../../SLIDESHOW/SlideShowDisplay";
import ViewCategory from "../ViewCategory/ViewCategory";

import { Link } from "react-router-dom";
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
          <div className="CategoryViewGrid">
            <Link to={`/category/Fruits`}>
              <CategoryView
                Categoryname="Fruits"
                api="https://still-peak-54145.herokuapp.com/api/category/Fruits"
                imageUrl="https://image.flaticon.com/icons/svg/457/457843.svg"
              />
            </Link>
            <Link to={`/category/Vegetables`}>
              <CategoryView
                Categoryname="Vegetables"
                api="https://still-peak-54145.herokuapp.com/api/category/Vegetables"
                imageUrl="https://image.flaticon.com/icons/svg/2909/2909841.svg"
              />
            </Link>{" "}
            <Link to={`/category/foodgrains`}>
              <CategoryView
                Categoryname="foodgrains"
                api="https://still-peak-54145.herokuapp.com/api/category/foodgrains"
                imageUrl="https://image.flaticon.com/icons/svg/616/616428.svg"
              />{" "}
            </Link>
            <Link to={`/category/oil`}>
              {" "}
              <CategoryView
                Categoryname="oil"
                api="https://still-peak-54145.herokuapp.com/api/category/oil"
                imageUrl="https://image.flaticon.com/icons/svg/2843/2843159.svg"
              />{" "}
            </Link>
            <Link to={`/category/masala`}>
              {" "}
              <CategoryView
                Categoryname="masala"
                api="https://still-peak-54145.herokuapp.com/api/category/masala"
                imageUrl="https://image.flaticon.com/icons/svg/2160/2160302.svg"
              />{" "}
            </Link>
            <Link to={`/category/dry fruits`}>
              <CategoryView
                Categoryname="dry fruits"
                api="https://still-peak-54145.herokuapp.com/api/category/dry fruits"
                imageUrl="https://image.flaticon.com/icons/svg/2224/2224240.svg"
              />{" "}
            </Link>
            <Link to={`/category/dairy`}>
              <CategoryView
                Categoryname="dairy"
                api="https://still-peak-54145.herokuapp.com/api/category/dairy"
                imageUrl="https://image.flaticon.com/icons/svg/2674/2674505.svg"
              />
            </Link>
          </div>
        </Route>

        <Route exact path="/">
          <SlideShowDisplay />
        </Route>

        <Route exact path="/">
          <ViewProduct
            searchData={data}
            search={true}
            api="https://still-peak-54145.herokuapp.com/api/category/Fruits"
          />
        </Route>

        <Route exact path="/">
          <ViewProduct
            searchData={data}
            search={true}
            api="https://still-peak-54145.herokuapp.com/api/category/Vegetables"
          />
        </Route>
        <Route exact path="/">
          <ViewProduct
            searchData={data}
            search={true}
            api="https://still-peak-54145.herokuapp.com/api/category/dairy"
          />
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

        <Route exact path="/myOrder">
          <Myorder />
        </Route>

        <Route
          exact
          path="/category/:categoryName"
          render={(props) => <ViewCategory {...props} />}
        />
      </BrowserRouter>
    </Fragment>
  );
};

export default Home;
