import React, { Component, Fragment } from "react";

import "./ViewCategoryItemStyle.css";
import { Link } from "react-router-dom";

class ViewCategoryItem extends Component {
  render() {
    return (
      <Fragment>
        <div className="MainContainerCategory">
          <div className="categoryMainContainer">
            <div className="categoryView-statusIcon">
              <i
                class="fa fa-stop-circle-o  imgstatusColor"
                aria-hidden="true"
              ></i>
            </div>

            <div className="categoryView-img">
              <img
                className="categoryImage"
                src={this.props.item.productImage}
              />
            </div>

            <div className="categoryView-Info">
              {/* */}
              <div className="categoryView-productName">
                <h4>{this.props.item.productName}</h4>
              </div>

              <div className="categoryViewInfo-Stock">
                <p className="categoryview-productStockInfo">
                  <span>
                    <i
                      class={`fas fa-certificate stockImg-${this.props.item.stock}`}
                    ></i>
                  </span>{" "}
                  <span> {this.props.item.stock} </span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {this.props.item.productWeight}
                  </span>
                </p>
              </div>
            </div>
            <div className="categoryView-Price">
              <h4> ₹{this.props.item.productPrice}</h4>
            </div>

            <div className="ProductView-btnBuy">
              <div className="buyNowBtn">
                {this.props.item.stock != "OutofStock" ? (
                  <Link to={`/product_Item/${this.props.item._id}`}>
                    {" "}
                    <p>
                      <span>
                        <i class="far fa-credit-card buyNowIcon"></i>
                      </span>
                      <span className="buynowText">Buy Now</span>
                    </p>
                  </Link>
                ) : (
                  <p>
                    <span>
                      <i class="fas fa-times-circle buyNowIcon"></i>
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ViewCategoryItem;
