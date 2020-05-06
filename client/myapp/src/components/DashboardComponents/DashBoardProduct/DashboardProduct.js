import React, { Component, Fragment } from "react";
import TopCard from "../../../common/components/Dashboard/TopCard";
import DashBoardAddProduct from "./AddProduct/DashBoardAddProduct";

import axios from "axios";

class DashboardProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [],

      TableHeaderData: [
        "Id",
        "ProductName",
        "Category",
        "Price",
        "Description",
        "Max Weight For Selling",
        "Date",
        // "Stock",
        "Image",
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

  btnDeleteHandler = (e) => {
    console.log(e.target);
    console.log(e.target.getAttribute("productid"));
    console.log(e.target.parentNode.parentNode);
    var parent_Node = e.target.parentNode.parentNode;
    var _id = e.target.getAttribute("productid");

    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("AdminLogin"),
      },
    };

    axios
      .delete(`/api/addproduct/${_id}`, axiosConfig)
      .then((res) => {
        console.log(res.data);
        parent_Node.remove();
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  //Table Data
  TableData() {
    return this.state.Data.map((data, index) => {
      console.log(data, "TableData");

      const {
        productCategory,
        productDescrption,
        productImage,
        productMaxSellingWeight,
        productName,
        productPrice,
        // stock,
        date,
        _id,
      } = data;

      return (
        <tr>
          <td>{index}</td>
          <td>{productName}</td>
          <td>{productCategory}</td>
          <td>{productPrice}</td>
          <td>{productDescrption}</td>
          <td>{productMaxSellingWeight}</td>
          <td>{date.slice(0, 10)}</td>
          {/* <td>{stock}</td> */}
          <td>{productImage}</td>
          <td>
            {" "}
            <button onClick={this.btnDeleteHandler} ProductId={_id}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  componentDidMount() {
    let axiosCofig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("AdminLogin"),
      },
    };

    axios
      .get("/api/addproduct/", axiosCofig)
      .then((res) => {
        console.log(res.data, "product data");

        this.setState({
          Data: res.data,
        });

        console.log(this.state.Data, "state");
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
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
