import React, { Component } from "react";

class DashBoardProductoutofStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Data: [
      //   {
      //     ProductName: "Apple",
      //     category: "fruits",
      //     weight: "1kg",
      //     price: "₹80",
      //     isStock: false,
      //   },
      //   {
      //     ProductName: "Mushroom",
      //     category: "Vegetables",
      //     weight: "1kg",
      //     price: "₹100",
      //     isStock: false,
      //   },
      //   {
      //     ProductName: "Corn",
      //     category: "Vegetables",
      //     weight: "1kg",
      //     price: "₹30",
      //     isStock: false,
      //   },
      //   {
      //     ProductName: "Tomato",
      //     category: "Vegetables",
      //     weight: "1kg",
      //     price: "₹40",
      //     isStock: false,
      //   },
      //   {
      //     ProductName: "Pineapple",
      //     category: "fruits",
      //     weight: "1kg",
      //     price: "₹50",
      //     isStock: false,
      //   },
      //   {
      //     ProductName: "orange",
      //     category: "fruits",
      //     weight: "1kg",
      //     price: "₹60",
      //     isStock: false,
      //   },
      // ],

      TableHeaderData: [
        "ID",
        "Product_id",
        "Name",
        " Category",
        "Price",
        "Stcok",
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
    return this.props.OutofStockData.map((data, index) => {
      const {
        productName,
        productCategory,
        _id,
        priceWithWeight,
        stock,
      } = data;

      return (
        <tr>
          <td>{index}</td>

          <td style={{ fontSize: "13px" }}>{_id}</td>
          <td style={{ fontSize: "14px" }}>{productName}</td>
          <td style={{ fontSize: "14px" }}>{productCategory}</td>
          <td style={{ fontSize: "14px" }}>{priceWithWeight}</td>
          <td style={{ fontSize: "14px" }}>
            <div className={`Stock-${stock}`}>{stock}</div>
          </td>
        </tr>
      );
    });
  }

  render() {
    console.log(this.props.OutofStockData, "OutofStockData ");

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
