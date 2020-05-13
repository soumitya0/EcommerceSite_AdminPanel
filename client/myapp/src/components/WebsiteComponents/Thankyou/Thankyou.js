import React, { Component, Fragment } from "react";

import axios from "axios";

class Thankyou extends Component {
  constructor(props) {
    super(props);

    this.state = {
      OrderDetails: "",
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("OrderData"));
    console.log(user, "JSON_PArse");

    // this.setState({
    //   OrderDetails: user,
    // });
    // console.log(this.state, "state");

    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("UserToken"),
      },
    };
    let bodyData = {
      UserName: user.Userdata.UserName,
      ReciverName: user.reciverdatd.reciverName,
      ReciverAddress: user.reciverdatd.houseNumber,
      FullAddress: user.reciverdatd.fullAddress,
      ProductName: user.Productdata.productName,

      ProductId: user.Productdata._id,
      ProductCategory: user.Productdata.productCategory,
      ProductPrice: user.Productdata.productPrice,
      PaymentRequestId: "4445558855",
    };

    axios
      .post("/api/order", bodyData, axiosConfig)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

  }

  render() {
    return (
      <Fragment>
        <h1>Thankyou</h1>
      </Fragment>
    );
  }
}

export default Thankyou;
