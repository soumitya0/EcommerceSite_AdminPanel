import React, { Component, Fragment } from "react";

import axios from "axios";
import "./ViewProductStyle.css";

import ViewProductItem from "./ViewProductItem/ViewProductItem";

class ViewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allProduct: [],
      search: false,
    };
  }

  componentDidMount() {
    console.log("i am ViewProduct ");
    console.log(localStorage.getItem("UserToken"));

    axios
      .get("https://still-peak-54145.herokuapp.com/api/addproduct/data") //getting all product
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

    console.log(this.state.search);
  }

  render() {
    console.log(this.props.searchData, "searchData");
    console.log(this.props.search, "search");
    console.log(this.props.searchData.length, " LENGTH searchData");

    return (
      <Fragment>
        <div className="Post_Grid">
          {this.props.searchData.length > 0
            ? this.props.searchData.map((product, index) => (
                <ViewProductItem key={index} item={product} />
              ))
            : this.state.allProduct.map((product, index) => (
                <ViewProductItem key={index} item={product} />
              ))}
        </div>
      </Fragment>
    );
  }
}

export default ViewProduct;
