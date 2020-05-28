import React, { Component, Fragment } from "react";
import ViewProduct from "../ViewProduct";

import "./ViewProductItemStyle.css";
import { Link } from "react-router-dom";

class ViewProductItem extends Component {
  render() {
    console.log(this.props.item);
    return (
      // <Fragment>
      //   <div className="ProductCardGrid">
      //     <div>
      //       <img
      //         className="imageLayoutthree"
      //         src={this.props.item.productImage}
      //       />
      //     </div>

      //     <div>
      //       <p>{this.props.item.productName}</p>
      //     </div>
      //     <div>
      //       <p>{this.props.item.priceWithWeight}</p>
      //     </div>
      //     <div> {this.props.item.productDescrption.slice(0, 36)}</div>
      //     <div>
      //       {this.props.item.stock != "OutofStock" ? (
      //         <Link
      //           to={`/product_Item/${this.props.item._id}`}
      //           className="BuyProductBTN"
      //         >
      //           Buy Now
      //         </Link>
      //       ) : (
      //         <div className="OutOfStock_product"> OUT OF STOCK</div>
      //       )}
      //     </div>
      //   </div>

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
                src={this.props.item.productImage}
              />
            </div>
            <div className="ProductView-Info">
              {/* */}
              <div className="Productview-productName">
                <h4>{this.props.item.productName}</h4>
              </div>

              <div className="ProductViewInfo-Stock">
                <p className="Productview-productStockInfo">
                  <span>
                    <i
                      class={`fas fa-certificate stockImg-${this.props.item.stock}`}
                    ></i>
                  </span>{" "}
                  <span> {this.props.item.stock}</span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {this.props.item.productWeight}
                  </span>
                </p>
              </div>
            </div>

            <div className="ProductView-Price">
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

export default ViewProductItem;
