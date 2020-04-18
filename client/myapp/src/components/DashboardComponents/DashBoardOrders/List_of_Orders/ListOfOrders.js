import React, { Component } from "react";

class ListOfOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [
        {
          ProductId: "848498",
          ProductName: "Apple",
          category: "fruits",
          UserName: "RAJ",
          UserPhone: "95447147881",
          DeliveryLocation: "sector-30",
          Weight: "2kg",
          Price: "160",
          Panding: "Yes",
        },
        {
          ProductId: "848498",
          ProductName: "Banana",
          category: "fruits",
          UserName: "RAM",
          UserPhone: "95446547881",
          DeliveryLocation: "sector-30",
          Weight: "1kg",
          Price: "160",
          Panding: "Yes",
        },
        {
          ProductId: "848498",
          ProductName: "Apple",
          category: "fruits",
          UserName: "soumitya chauhan",
          UserPhone: "95447147881",
          DeliveryLocation: "sector-30",
          Weight: "2kg",
          Price: "160",
          Panding: "Yes",
        },
      ],
      TableHeaderData: [
        "# ",
        "ProductId",
        "ProductName",
        "category",
        "UserName",
        "UserPhone",
        "DeliveryLocation",
        "Weight",
        "Price",
        "Panding",
        "Remove",
      ],
    };
  }

  TableHeader() {
    return this.state.TableHeaderData.map((data) => <th>{data}</th>);
  }

  TableData() {
    return this.state.Data.map((data, index) => {
      const {
        ProductId,
        ProductName,
        category,
        UserName,
        UserPhone,
        DeliveryLocation,
        Weight,
        Price,
        Panding,
      } = data;

      return (
        <tr>
          <td>{index}</td>
          <td>{ProductId}</td>
          <td>{ProductName}</td>
          <td>{category}</td>
          <td>{UserName}</td>
          <td>{UserPhone}</td>
          <td>{DeliveryLocation}</td>
          <td>{Weight}</td>
          <td>{Price}</td>
          <td>{Panding}</td>
          <td>
            <button>Remove</button>
          </td>
        </tr>
      );
    });
  }

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
