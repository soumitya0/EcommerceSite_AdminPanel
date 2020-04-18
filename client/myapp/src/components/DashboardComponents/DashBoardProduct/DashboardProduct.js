import React, { Component, Fragment } from "react";
import TopCard from "../../../common/components/Dashboard/TopCard";
import DashBoardAddProduct from "./AddProduct/DashBoardAddProduct";
class DashboardProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [
        {
          ProductId: "455856948844",
          ProductName: "Apple",
          Category: "fruits",
          weight: "1kg",
          price: "₹80",
          Description: "Best selling Product",
          Date: "02/11/2020",
          Stock: "available",
        },
        {
          ProductId: "455856948844",
          ProductName: "orange",
          Category: "fruits",
          weight: "1kg",
          price: "₹80",
          Description: "Best selling Product",
          Date: "22/11/2020",
          Stock: "available",
        },
        {
          ProductId: "455856948844",
          ProductName: "Mushroom",
          Category: "Vegetables",
          weight: "1kg",
          price: "₹87",
          Description: "Best selling Product",
          Date: "22/11/2020",
          Stock: "available",
        },
        {
          ProductId: "455856948844",
          ProductName: "Banana",
          Category: "fruits",
          weight: "1kg",
          price: "₹80",
          Description: "Best selling Product",
          Date: "22/11/2020",
          Stock: "available",
        },
        {
          ProductId: "455856948844",
          ProductName: "Corn",
          Category: "Vegetables",
          weight: "1kg",
          price: "₹30",
          Description: "Best selling Product",
          Date: "22/11/2020",
          Stock: "available",
        },
      ],

      TableHeaderData: [
        "Id",
        "ProductId",
        "ProductName",
        "Category",
        "Weight",
        "Price",
        "Description",
        "Date",
        "Stock",
        "Edit",
        "Delete",
      ],
    };
  }

  //Table
  //Header
  TableHeader() {
    return this.state.TableHeaderData.map((data, index) => (
      <th key={data.ProductId}>{data}</th>
    ));
  }

  //Table Data

  TableData() {
    return this.state.Data.map((data, index) => {
      const {
        ProductId,
        ProductName,
        Category,
        weight,
        price,
        Description,
        Date,
        Stock,
      } = data;

      return (
        <tr>
          <td>{index}</td>
          <td>{ProductId}</td>
          <td>{ProductName}</td>
          <td>{Category}</td>
          <td>{weight}</td>
          <td>{price}</td>
          <td>{Description}</td>
          <td>{Date}</td>
          <td>{Stock}</td>
          <td>
            {" "}
            <button>Edit</button>
          </td>
          <td>
            {" "}
            <button>Delete</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Fragment>
        <h1 className="text-gray text-700">Products</h1>
        <p className="marginTop-10">Products here</p>
        <div className="GridCardInfo marginTop-20">
          <div>
            <TopCard />
          </div>
          <div>
            <TopCard />
          </div>
          <div>
            <TopCard />
          </div>
        </div>

        {/* Table*/}
        <div className="tabelContainerProduct marginTop-50">
          <div className="tableName text-700">
            <p>Product List </p>
          </div>

          <div className="header-buttons">
            <button className="btnproduct btn-green ">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <table className="TableState">
            <tr>{this.TableHeader()}</tr>

            <tbody>{this.TableData()}</tbody>
          </table>
        </div>

        <DashBoardAddProduct />
      </Fragment>
    );
  }
}

export default DashboardProduct;
