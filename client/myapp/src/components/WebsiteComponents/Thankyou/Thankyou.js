import React, { Component, Fragment } from "react";

import axios from "axios";
import { Redirect } from "react-router-dom";

class Thankyou extends Component {
  constructor(props) {
    console.log("i am constructor ");

    super(props);

    this.state = {
      OrderDetails: "",

      orderSuccess: false,
    };
  }

  componentDidMount() {
    //HERE DATA IS NOT COMMING
    //    this.getInstaMojoResponse();

    var dataInstaMojo = "";
    const params = new URLSearchParams(window.location.search);
    for (const param of params) {
      console.log(JSON.parse(param[1]));

      dataInstaMojo = JSON.parse(param[1]);
    }

    console.log(dataInstaMojo, "dataInstaMojo");

    console.log("i am componentDid mount ");
    console.log(this.state);

    if (localStorage.getItem("OrderData") != null) {
      const user = JSON.parse(localStorage.getItem("OrderData"));
      console.log(user, "JSON_PArse");

      let axiosConfig = {
        headers: {
          "X-Auth-Token": localStorage.getItem("UserToken"),
        },
      };

      let bodyData = {
        UserName: user.Userdata.UserName,

        ReciverName: user.reciverdatd.reciverName,
        ReciverPhone: user.reciverdatd.phoneNumber,
        ReciverHouseNo: user.reciverdatd.houseNumber,
        ReciverSector: user.reciverdatd.Sector,
        FullAddress: user.reciverdatd.fullAddress,

        ProductName: user.Productdata.productName,
        ProductId: user.Productdata._id,
        ProductCategory: user.Productdata.productCategory,
        ProductPrice: user.Productdata.productPrice,
        PaymentRequestId: dataInstaMojo.payment_request_id,
        instaMojoOrderDetails: dataInstaMojo,
      };

      axios
        .post(
          "https://still-peak-54145.herokuapp.com/api/order",
          bodyData,
          axiosConfig,
        )
        .then((res) => {
          console.log(res.data);
          this.setState({
            orderSuccess: true,
          });
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
        });
    } else {
      console.log("user data is null");
    }
  }

  getInstaMojoResponse() {
    console.log("i am getinstaMojo");
  }

  render() {
    console.log("i am render");
    // const params = new URLSearchParams(window.location.search);

    // for (const param of params) {
    //   console.log(JSON.parse(param[1]));
    //   this.setState({
    //     instaMojoOrderDetails: JSON.parse(param[1]),
    //   });
    // }
    // var url = window.location.search;
    // url = url.replace("?", ""); // remove the ?
    // console.log(url); //alerts ProjectID=462 is your case

    console.log(this.state, "i am state");
    return (
      <Fragment>
        <h1>Thankyou for buying</h1>
        {this.state.orderSuccess == true
          ? localStorage.removeItem("OrderData")
          : null}
      </Fragment>
    );
  }
}

export default Thankyou;
