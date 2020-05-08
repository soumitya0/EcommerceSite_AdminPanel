import React, { Component, Fragment } from "react";

import axios from "axios";
import "./ViewProductStyle.css";

import ViewProductItem from "./ViewProductItem/ViewProductItem";

class ViewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allProduct: [],
    };
  }

  componentDidMount() {
    console.log("i am ViewProduct ");
    console.log(localStorage.getItem("UserToken"));

    axios
      .get("api/addproduct/data") //getting all product
      .then((res) => {
        console.log(res.data);
        this.setState({
          allProduct: res.data,
        });
        console.log(this.state.allProduct, "ALL_PRODUCT");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  render() {
    return (
      <Fragment>
        <div className="Post_Grid">
          {this.state.allProduct.map((product, index) => (
            <ViewProductItem key={index} item={product} />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default ViewProduct;
