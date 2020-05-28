import React, { Component, Fragment } from "react";

import TopCard from "../../../common/components/Dashboard/TopCard";

import axios from "axios";
import EditProduct from "./EditProduct/EditProduct";

import { Redirect } from "react-router-dom";

class DashBoardManageProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [],

      TableHeaderData: [
        "Id",
        "ProductId",
        "ProductName",
        "Category",
        "Price",
        "Description",
        "Date",
        "Stock",
        "Edit",
        "Delete",
      ],

      editBtn: false,
      trIndex: "",
    };
  }

  btnEditHandler = (e) => {
    console.log(e.target.parentNode);
    console.log(e.target.getAttribute("productid"));

    this.setState({
      editBtn: true,
    });

    this.state.editBtn == true
      ? this.setState({
          editBtn: false,
        })
      : this.setState({
          editBtn: true,
          trIndex: e.target.getAttribute("productid"),
        });
  };

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
      .delete(
        `https://still-peak-54145.herokuapp.com/api/addproduct/${_id}`,
        axiosConfig,
      )
      .then((res) => {
        console.log(res.data);
        parent_Node.remove();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
      });
  };

  btnStockHandler = (e) => {
    console.log("I am Click");
    console.log(this.state.stockData);
    console.log(e.target.parentNode);
    console.log(e.target.getAttribute("Stock"));
    let getStock = e.target.getAttribute("Stock");
    console.log(getStock);
    let _id = e.target.getAttribute("productid");
    console.log(_id);

    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("AdminLogin"),
      },
    };

    if (getStock == "OutofStock") {
      console.log("this is Out of Stock change to Availabel");

      let bodyData = {
        stock: "available",
      };

      axios
        .put(
          `https://still-peak-54145.herokuapp.com/api/stock/${_id}`,
          bodyData,
          axiosConfig,
        )
        .then((res) => {
          console.log(res.data);
          //window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
        });
    } else if (getStock == "available") {
      console.log("this is Available change to Out of Stock");
      let bodyData = {
        stock: "OutofStock",
      };

      axios
        .put(
          `https://still-peak-54145.herokuapp.com/api/stock/${_id}`,
          bodyData,
          axiosConfig,
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
        });
    }

    window.location.reload();
  };

  componentDidMount() {
    console.log(this.state.Data);
    let axiosCofig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("AdminLogin"),
      },
    };

    axios
      .get("https://still-peak-54145.herokuapp.com/api/addproduct/", axiosCofig)
      .then((res) => {
        console.log(res.data, "product data");

        this.setState({
          Data: res.data,
        });

        console.log(this.state.Data, "state");

        console.log(this.state.Data.length, "LENGTH");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Table
  //Header
  TableHeader() {
    return this.state.TableHeaderData.map((data, index) => (
      <th key={data.ProductId}>{data}</th>
    ));
  }

  TableData() {
    return this.state.Data.map((data, index) => {
      console.log(data, "TableData");

      const {
        productCategory,
        productDescrption,
        productName,
        productPrice,
        stock,
        date,
        _id,
      } = data;

      return (
        <tr>
          <td>{index}</td>
          <td>{_id}</td>
          <td>{productName}</td>
          <td>{productCategory}</td>
          <td>{productPrice}</td>
          <td>{productDescrption}</td>
          <td>{date.slice(0, 10)}</td>

          <td>
            <div
              onClick={this.btnStockHandler}
              className={`Stock-${stock}`}
              ProductId={_id}
              Stock={stock}
              className={`Stock-${stock}`}
            >
              {stock}
            </div>
          </td>
          <td style={{ width: "70px" }}>
            <button
              ProductId={index}
              style={{ width: "50px" }}
              onClick={this.btnEditHandler}
            >
              Edit
            </button>
          </td>

          <td>
            <button onClick={this.btnDeleteHandler} ProductId={_id}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    console.log(this.state.editBtn, "Edit");
    console.log(this.state.Data, "STATE DATA");

    return (
      <Fragment>
        <div>
          <h1 className="text-gray text-700">ManageProduct</h1>
          <p className="marginTop-10">ManageProduct here</p>
          <div className="GridCardInfo marginTop-20">
            <div>
              <TopCard
                name="CATEGORY COUNT"
                value={this.state.Data.length}
                imgName="fas fa-list"
                lineColor="CARD-BLUE"
              />
            </div>
          </div>
        </div>

        <div>
          {this.state.editBtn == true ? (
            <EditProduct editData={this.state.Data[this.state.trIndex]} />
          ) : null}
        </div>

        {/* Table*/}
        <div className="tabelContainerProduct marginTop-50">
          <div className="tableName text-700">
            <p>Product List </p>
          </div>

          <table className="TableState">
            <tr>{this.TableHeader()}</tr>
            <tbody>{this.TableData()}</tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default DashBoardManageProduct;
