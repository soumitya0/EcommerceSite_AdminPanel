import React, { Component } from "react";

import axios from "axios";

class ListOfOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [],
      TableHeaderData: [
        "# ",
        "ProductId",
        "ProductName",
        "category",
        "Price",

        "UserName",
        "ReciverName",
        "ReciverPhone",
        "Sector",
        "DeliveryLocation",
        "orderStatus",
        "date",
        // "Remove",
      ],

      changeOrderStatus: false,
    };
  }

  componentDidMount() {
    console.log(localStorage.getItem("AdminLogin"));

    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("AdminLogin"),
      },
    };

    axios
      .get("https://still-peak-54145.herokuapp.com/api/order", axiosConfig)
      .then((res) => {
        console.log(res.data, "i  am ordder data");
        this.setState({
          Data: res.data,
        });

        console.log(this.state, "STATE");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  TableHeader() {
    return this.state.TableHeaderData.map((data) => <th>{data}</th>);
  }

  TableData() {
    return this.state.Data.map((data, index) => {
      const {
        _id,
        ProductId,
        ProductName,
        ProductCategory,

        UserName,
        ReciverName,
        ReciverPhone,
        ReciverSector,
        FullAddress,
        ProductPrice,
        orderStatus = this.state.Data.orderStatus,
        date = this.state.Data.data,
      } = data;
      return (
        <tr style={{ fontSize: "15px" }}>
          <td>{index}</td>
          <td>{ProductId}</td>
          <td>{ProductName}</td>
          <td>{ProductCategory}</td>

          <td>{ProductPrice}</td>
          <td>{UserName}</td>
          <td>{ReciverName}</td>
          <td>{ReciverPhone}</td>
          <td>{ReciverSector}</td>
          <td>{FullAddress}</td>
          <td style={{ cursor: "pointer" }}>
            <div
              onClick={this.btnOrderHandler}
              orderStatus={orderStatus}
              className={`orderStatus-${orderStatus}`}
              order={_id}
            >
              {orderStatus}
            </div>
          </td>
          <td>{date.slice(0, 10)}</td>
          {/* <td>
            <button>Remove</button>
          </td> */}
        </tr>
      );
    });
  }

  btnOrderHandler = (e) => {
    console.log("i am click");
    console.log(e.target);

    console.log(e.target.getAttribute("order"));
    console.log(e.target.getAttribute("orderstatus"));
    let _id = e.target.getAttribute("order");
    let getOrderStatus = e.target.getAttribute("orderstatus");

    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("AdminLogin"),
      },
    };

    let bodyData = {
      orderStatus: "",
    };

    if (getOrderStatus == "pending") {
      bodyData.orderStatus = "onWay";
    } else if ((getOrderStatus = "onWay")) {
      bodyData.orderStatus = "delivered";
    } else if ((getOrderStatus = "delivered")) {
      alert(" Product Deliverd");
    }

    axios
      .put(
        `https://still-peak-54145.herokuapp.com/api/order/${_id}`,
        bodyData,
        axiosConfig,
      )

      .then((res) => {
        console.log(res.data);
        this.setState({
          changeOrderStatus: true,
        });
        console.log(this.state.changeOrderStatus);
      })

      .catch((error) => {
        console.log(error.response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    window.location.reload();
  };

  render() {
    return (
      <div className="tabelContainerProduct marginTop-50">
        <div className="tableName text-700">
          <p>All Orders Panding+Delivered</p>
        </div>
        <table className="TableState">
          <tr>{this.TableHeader()}</tr>
          <tbody>{this.TableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default ListOfOrders;
