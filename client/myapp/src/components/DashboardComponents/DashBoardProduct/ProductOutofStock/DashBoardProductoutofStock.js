import React, { Component } from "react";

class DashBoardProductoutofStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [
        {
          ProductName: "Apple",
          category: "fruits",
          weight: "1kg",
          price: "₹80",
          isStock: false,
        },
        {
          ProductName: "Mushroom",
          category: "Vegetables",
          weight: "1kg",
          price: "₹100",
          isStock: false,
        },
        {
          ProductName: "Corn",
          category: "Vegetables",
          weight: "1kg",
          price: "₹30",
          isStock: false,
        },
        {
          ProductName: "Tomato",
          category: "Vegetables",
          weight: "1kg",
          price: "₹40",
          isStock: false,
        },
        {
          ProductName: "Pineapple",
          category: "fruits",
          weight: "1kg",
          price: "₹50",
          isStock: false,
        },
        {
          ProductName: "orange",
          category: "fruits",
          weight: "1kg",
          price: "₹60",
          isStock: false,
        },
      ],

      TableHeaderData: ["ID", "Name", " Category", "Weight", "Price", "Stcok"],
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
      const { ProductName, category, weight, price, isStock } = data;

      return (
        <tr>
          <td>{index}</td>
          <td>{ProductName}</td>
          <td>{category}</td>
          <td>{weight}</td>
          <td>{price}</td>
          <td>{isStock}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="tabelContainer marginTop-50">
        <div className="tableName text-700">
          <p>Out of Stock </p>
        </div>
        <table className="TableState">
          <tr>{this.TableHeader()}</tr>
          <tbody>{this.TableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default DashBoardProductoutofStock;
