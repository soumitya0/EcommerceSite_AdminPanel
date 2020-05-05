import React, { Component, Fragment } from "react";

import axios from "axios";
import PaginationItem from "../../../../common/components/Dashboard/Pagination/PaginationItem";

class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CategoryItem: [],
      Headerdata: ["#", "CategoryName", "Delete"],
      singleData: [],
      length: "",
    };
  }

  TableHeaderdata() {
    return this.state.Headerdata.map((data, index) => <th>{data}</th>);
  }

  TableData() {
    return this.state.CategoryItem.map((data, index) => {
      const CategoryName = data.Categoryname;

      return (
        <tr>
          <td>{index}</td>
          <td>{CategoryName}</td>
          <td>
            <button onClick={this.btnDeleteHandler} CategoryId={data._id}>
              DELETE
            </button>
          </td>
        </tr>
      );
    });
  }

  btnDeleteHandler = (event) => {
    console.log("i am delete");
    console.log(event.target.getAttribute("categoryid"));
    var parent_Node = event.target.parentNode.parentNode;
    console.log(parent_Node);
    var _id = event.target.getAttribute("categoryid");
    console.log(_id, "id");

    console.log(localStorage.getItem("AdminLogin"));

    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("AdminLogin"),
      },
    };
    axios
      .delete(`/api/category/${_id}`, axiosConfig)
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

    window.location.reload();
  };

  componentDidMount() {
    axios
      .get("/api/category")
      .then((res) => {
        console.log(res.data, "i am from CatagoryList.js");
        this.setState({
          CategoryItem: res.data,
        });

        console.log(this.state, "state");
        console.log(this.state.CategoryItem.length, "CategoryList line-78");

        this.setState({
          length: this.state.CategoryItem.length,
        });
        console.log(this.state.length, "CategoryList line-84");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // lengthPass = () => {
  //   console.log(this.state.length, "lengthPass in CategoryList");
  // };

  demoMethod() {
    this.props.sendData(this.state.CategoryItem.length);
  }

  render() {
    this.demoMethod();

    console.log(this.state.CategoryItem.length, "length of CategoryList");
    return (
      <Fragment>
        <div className="FormContainer marginTop-50">
          <div className="tableName text-700">
            <p>List of Category</p>
          </div>

          <table className="TableState">
            <tr>{this.TableHeaderdata()}</tr>

            <tbody>{this.TableData()}</tbody>
          </table>

          <PaginationItem />
        </div>

        {/* <button onClick={this.props.dataSet("54644")}>Click me</button> */}
      </Fragment>
    );
  }
}

export default CategoryList;
