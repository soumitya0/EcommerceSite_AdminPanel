import React, { Component, Fragment, useState, useEffect } from "react";

import "./BuyProductStyle.css";
import DeliveryAddressForm from "./DeliveryAddressForm/DeliveryAddressForm";
import ProductPreview from "./ProductPreview/ProductPreview";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

import { Redirect } from "react-router-dom";

const BuyProduct = (props) => {
  const [reciverdata, setReciverData] = useState(0); //getting Reciver data or address

  const [Product_Data, setProductData] = useState(0); //getting Product data

  const [Userdata, setData] = useState(); // gettign login user

  const [UserLogin, setUserLogin] = useState(true);

  //API call
  useEffect(() => {
    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("UserToken"),
      },
    };

    axios
      .get("https://still-peak-54145.herokuapp.com/api/user", axiosConfig)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getDataformChild = (val) => {
    console.log(val, "BuyProduct");

    setReciverData(val);
  };

  const getDataProduct = (val) => {
    console.log(val, "productData");

    setProductData(val);
  };

  console.log("Userdata", Userdata);
  console.log("Data", reciverdata);
  console.log("Product_Data", Product_Data);

  const globalObj = {};

  const onBuyClick = () => {
    globalObj.reciverdatd = reciverdata;
    globalObj.Userdata = Userdata;
    globalObj.Productdata = Product_Data;

    if (globalObj.Userdata == undefined) {
      console.log("USER DATA IS UNDEFINED");
      setUserLogin(false);
    } else {
      localStorage.setItem("OrderData", JSON.stringify(globalObj));
      // var user = JSON.parse(localStorage.getItem("OrderData"));
      // console.log(user, "JSON_PArse");

      console.log(globalObj, "globalObj");

      console.log("i am click");
      console.log(reciverdata, "reciverData"); //

      console.log(Product_Data, "Product_Data"); //

      console.log(Userdata, "userData"); //

      //instaMojo
      const data = {
        purpose: "buy",
        amount: Product_Data.productPrice,
        buyer_name: Userdata.UserName,
        email: Userdata.UserEmail,
        user_id: Userdata._id,
        buyer_phone: reciverdata.phoneNumber,

        redirect_url: `https://still-peak-54145.herokuapp.com/api/bid/callback?user_id=${Userdata._id}`,
        weebhook_url: "/webhook/",
      };

      axios
        .post("https://still-peak-54145.herokuapp.com/api/bid/pay/", data)
        .then((res) => {
          console.log("resp", res.data);

          window.location.href = res.data; // this will help to redirect to res.data i.e long url
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };

  return (
    <Fragment>
      {UserLogin == true ? (
        <div className="buyProductGrid">
          <div className="buyProductAddressForm ">
            <DeliveryAddressForm sendData={getDataformChild} />
          </div>

          <div>
            <ProductPreview
              Product_id={props.match.params.id}
              sendProduct={getDataProduct}
            />
          </div>
          <div>
            <div className="checkOutBtn">
              <p className="checkOutText" onClick={onBuyClick}>
                Checkout
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              working: "i am working",
            },
          }}
        />
      )}
    </Fragment>
  );
};

export default BuyProduct;
