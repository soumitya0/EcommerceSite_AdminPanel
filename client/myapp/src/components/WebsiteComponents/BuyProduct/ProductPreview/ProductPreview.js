import React, { Component, Fragment } from "react";

import "./ProductPreviewStyle.css";

import axios from "axios";
class ProductPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_Data: {},
    };

    console.log(this.props.Product_id, "from ProductPreview");
  }
  componentDidMount() {
    console.log("i am ProductPreview");

    axios
      .get(
        `https://still-peak-54145.herokuapp.com/api/addproduct/${this.props.Product_id}`,
      )
      .then((res) => {
        console.log("i am data from ProductID");
        console.log(res.data);
        this.setState({
          product_Data: res.data,
        });

        // console.log(this.state.productData, "state2222");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  demoMethod = () => {
    this.props.sendProduct(this.state.product_Data);
  };
  render() {
    this.demoMethod();

    console.log(this.state, "state565464");
    console.log(this.state.product_Data.productName);
    console.log(this.state.product_Data);

    return (
      <Fragment>
        <div className="ProductPreviewGrid">
          <div className="headingProductPreview">
            <p className="headingProductPreviewText"> My Product</p>
          </div>
          <div>
            <img
              className="imageLayoutthree"
              src={
                process.env.PUBLIC_URL +
                `/uploads/${this.state.product_Data.productImage}`
              }
            />
          </div>

          <div className="ProductPreviewDetails">
            <div>
              <p className=" ProductPreviewName">
                {this.state.product_Data.productName}
              </p>
            </div>

            <div>
              <p className="ProductPreviewCategory ">
                {this.state.product_Data.productCategory}
              </p>
            </div>

            <div>
              <p className="ProductPreviewPriceWithWeight ">
                {this.state.product_Data.priceWithWeight}
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProductPreview;
