import React, { Component } from "react";

class PendingOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [
        {
          ProductId: "45456",
          ProductName: "banana",
          location: "sector30",
          isPending: false,
          price: "₹80",
        },
        {
          ProductId: "65456",
          ProductName: "mango",
          location: "sector30",
          isPending: false,
          price: "₹5000",
        },
        {
          ProductId: "454512",
          ProductName: "Chocolate",
          location: "sector30",
          isPending: false,
          price: "₹8000",
        },
        {
          ProductId: "4654684698",
          ProductName: "Sugar",
          location: "sector30",
          isPending: false,
          price: "₹80000",
        },
        {
          ProductId: "45413351656",
          ProductName: "Pineapple",
          location: "sector30",
          isPending: false,
          price: "₹80000",
        },
        {
          ProductId: "651213",
          ProductName: "orange",
          location: "sector28",
          isPending: false,
          price: "₹800052",
        },
      ],

      TableHeaderData: [
        "ID",
        "ProductId",
        " ProductName",

        "location",
        "price",
        "Pending",
      ],
    };
  }

  //Api call

  //header
  //header
  TableHeader() {
    return this.state.TableHeaderData.map((data) => (
      <th key={data.id}> {data}</th>
    ));
  }

  TableData() {
    return this.state.Data.map((data, index) => {
      const { ProductId, ProductName, location, price, isPending } = data;

      return (
        <tr>
          <td>{index}</td>
          <td>{ProductId}</td>
          <td>{ProductName}</td>
          <td>{location}</td>
          <td>{price}</td>
          <td>{isPending}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="tabelContainer marginTop-50">
        <div className="tableName text-700">
          <p>Pending Orders</p>
        </div>
        <table className="TableState">
          <tr>{this.TableHeader()}</tr>
          <tbody>{this.TableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default PendingOrders;
