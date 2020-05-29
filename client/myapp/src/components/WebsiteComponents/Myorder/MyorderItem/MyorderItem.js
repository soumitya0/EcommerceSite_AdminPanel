import React, { Component, Fragment } from "react";
import axios from "axios";
import "./MyorderItemStyle.css";
class MyorderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://still-peak-54145.herokuapp.com/api/addproduct/${this.props.item.ProductId}`,
      )
      .then((res) => {
        this.setState({
          imageUrl: res.data.productImage,
        });
      });
  }

  render() {
    console.log(this.props.item, "ITEMS");
    console.log(this.state.imageUrl);
    return (
      <Fragment>
        <div className="GridProduct">
          <div className="ProductInfo">
            <div className="ProductInfo-Image">
              <img
                src={this.state.imageUrl}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
            <div style={{ placeSelf: "center" }}>
              <h3>{this.props.item.ProductName}</h3>
            </div>
            <div style={{ placeSelf: "center" }}>
              <h3>{this.props.item.ProductCategory}</h3>
            </div>

            <div style={{ placeSelf: "center" }}>
              <h3>₹ {this.props.item.ProductPrice}</h3>
            </div>
            <div className={`ProductInfo-OrderStatus `}>
              <h4 className={`orderStatus-${this.props.item.orderStatus}`}>
                {" "}
                {this.props.item.orderStatus}
              </h4>
            </div>

            <div>
              <h5> Order Date </h5>
              {this.props.item.date.slice(0, 10)}
            </div>

            <div className="ProductInfo-PaymentId">
              <h5> Order Id </h5>
              {this.props.item._id}
            </div>

            <div className="ProductInfo-OrderId">
              <h5> Payment Id </h5>
              {this.props.item.instaMojoOrderDetails.payment_id}
            </div>
          </div>

          <div className="ReciverInfo">
            <div>
              <h5> Reciver Name </h5>
              {this.props.item.ReciverName}
            </div>

            <div>
              <h5> Reciver Phone </h5>
              {this.props.item.ReciverPhone}
            </div>

            <div className="ReciverInfo-Address">
              <h5> Reciver Address </h5>
              {this.props.item.FullAddress}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MyorderItem;
