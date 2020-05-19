import React, { Component } from "react";

class PendingOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [],

      TableHeaderData: [
        "Reciver Name",
        "ProductName",
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
    return this.props.pendingOrder.map((data, index) => {
      const {
        ProductId,

        ReciverName,
        ProductName,
        FullAddress,
        ProductPrice,
        orderStatus,
      } = data;

      return (
        <tr style={{ fontSize: "15px" }}>
          {/* <td>{ProductId}</td> */}
          <td>{ReciverName}</td>
          <td>{ProductName}</td>
          <td>{FullAddress}</td>
          <td>{ProductPrice}</td>
          <td style={{ cursor: "pointer" }}>
            <div className={`orderStatus-${orderStatus}`}>{orderStatus}</div>
          </td>
        </tr>
      );
    });
  }

  render() {
    console.log(this.props.pendingOrder, "props pendingOrder");
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
