import React, { Component, Fragment } from "react";
import TopCard from "../../../common/components/Dashboard/TopCard";
import DashBoardAddProduct from "./AddProduct/DashBoardAddProduct";

import axios from "axios";

import "./DashboardProductStyle.css";

class DashboardProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [],
      OutofStock: [],
      StockAvailabel: [],
      TableHeaderData: [
        "Id",
        "ProductName",
        "Category",
        "Price",
        "Description",
        "Max Weight For Selling",
        "Date",
        "Stock",
        // "Image",
        "Delete",
      ],

      stockData: "",
    };
  }

  //Table
  //Header
  TableHeader() {
    return this.state.TableHeaderData.map((data, index) => (
      <th key={data.ProductId}>{data}</th>
    ));
  }

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
        stock: "Avaliable",
      };

      axios
        .put(`/api/stock/${_id}`, bodyData, axiosConfig)
        .then((res) => {
          console.log(res.data);
          //window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else if (getStock == "Avaliable") {
      console.log("this is Available change to Out of Stock");
      let bodyData = {
        stock: "OutofStock",
      };

      axios
        .put(`/api/stock/${_id}`, bodyData, axiosConfig)
        .then((res) => {
          console.log(res.data);
          //window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    window.location.reload();
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
        // productImage,
        productMaxSellingWeight,
        productName,
        productPrice,
        stock,
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
          <td>
            <div
              onClick={this.btnStockHandler}
              ProductId={_id}
              Stock={stock}
              className={`Stock-${stock}`}
            >
              {stock}
            </div>
          </td>
          {/* <td>{productImage}</td> */}
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

        console.log(this.state.Data.length, "LENGTH");
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    axios
      .get("/api/product/stock/OutofStock")
      .then((res) => {
        console.log(res.data, "OUT-OF-STOCK");
        this.setState({
          OutofStock: res.data,
        });
        console.log(this.state.OutofStock, "STATE OUT-OF-STOCK");
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    axios
      .get("/api/product/stock/available")
      .then((res) => {
        console.log(res.data, "AVAILABLE ");

        this.setState({
          StockAvailabel: res.data,
        });

        console.log(this.state.StockAvailabel, "STATE - AVAILABLE ");
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
            <TopCard
              name="PRODUCT COUNT"
              value={this.state.Data.length}
              imgName="fas fa-shopping-basket"
            />
          </div>
          <div>
            <TopCard
              name="STOCK COUNT"
              value={this.state.StockAvailabel.length}
              imgName="fas fa-cubes"
            />
          </div>
          <div>
            <TopCard
              name="OUT OF STOCK"
              value={this.state.OutofStock.length}
              imgName="far fa-circle"
            />
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
