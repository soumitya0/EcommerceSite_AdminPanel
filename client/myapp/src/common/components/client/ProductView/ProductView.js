import React, { Component, Fragment } from "react";

import "./ProductViewStyle.css";
class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: "In Stock",
      weight: "1kg",
    };
  }

  render() {
    return (
      <Fragment>
        <div className="MainContainer">
          <div className="GridContainer">
            <div className="ProductView-statusIcon">
              <i
                class="fa fa-stop-circle-o  imgstatusIcon"
                aria-hidden="true"
              ></i>
            </div>

            <div className="ProductView-img">
              <img
                className="ProductImage"
                src={
                  process.env.PUBLIC_URL + `/uploads/image-1588961030836.jpg`
                }
              />
            </div>
            <div className="ProductView-Info">
              {/* */}
              <div className="Productview-productName">
                <h4>Appel</h4>
              </div>

              <div className="ProductViewInfo-Stock">
                <p className="Productview-productStockInfo">
                  <span>
                    <i class="fas fa-certificate stockImg"></i>
                  </span>{" "}
                  <span> {this.state.stock} </span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {this.state.weight}
                  </span>
                </p>
              </div>
            </div>

            <div className="ProductView-Price">
              <h4> ₹ 500</h4>
            </div>

            <div className="ProductView-btnBuy">
              <div className="buyNowBtn">
                <p>
                  <span>
                    <i class="far fa-credit-card buyNowIcon"></i>
                  </span>
                  <span className="buynowText">Buy Now</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <h1>SOUMITYA</h1>
      </Fragment>
    );
  }
}

export default ProductView;
