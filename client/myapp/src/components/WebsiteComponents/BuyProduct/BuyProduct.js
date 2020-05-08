import React, { Component, Fragment } from "react";

import "./BuyProductStyle.css";
import DeliveryAddressForm from "./DeliveryAddressForm/DeliveryAddressForm";
import ProductPreview from "./ProductPreview/ProductPreview";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

class BuyProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DeliveryAddress: false,
      name: "soumitya",
      IdProduct: this.props.match.params.id,
    };

    console.log(this.props.match);
    console.log(this.props.match.params.id, "componentsDidMount");
  }

  openTab = (tab, event) => {
    console.log(tab);
    console.log(event.target);

    if (tab == "Deliver Address") {
      this.setState({
        DeliveryAddress: true,
      });
    } else {
      this.setState({
        DeliveryAddress: false,
      });
    }
  };

  render() {
    console.log(this.state, "state");
    return (
      <Fragment>
        <div className="buyProductGrid">
          <div className="buyProductAddressForm ">
            <DeliveryAddressForm />
          </div>

          <div>
            <ProductPreview Product_id={this.state.IdProduct} />
          </div>
          <div>
            <div className="checkOutBtn">
              <p className="checkOutText">Checkout</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default BuyProduct;
