import React, { Component, Fragment } from "react";
import ViewProduct from "../ViewProduct";

import "./ViewProductItemStyle.css";
import { Link } from "react-router-dom";

class ViewProductItem extends Component {
  render() {
    return (
      <Fragment>
        <div className="ProductCardGrid">
          <div>
            <img
              className="imageLayoutthree"
              src={
                process.env.PUBLIC_URL +
                `/uploads/${this.props.item.productImage}`
              }
            />
          </div>

          <div>
            <p>{this.props.item.productName}</p>
          </div>
          <div>
            <p>{this.props.item.priceWithWeight}</p>
          </div>
          <div> {this.props.item.productDescrption.slice(0, 36)}</div>
          <div>
            {this.props.item.stock != "OutofStock" ? (
              <Link
                to={`/product_Item/${this.props.item._id}`}
                className="BuyProductBTN"
              >
                Buy Now
              </Link>
            ) : (
              <div className="OutOfStock_product"> OUT OF STOCK</div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ViewProductItem;
