import React, { Component, Fragment } from "react";
import "./AddCategoryStyle.css";

import axios from "axios";
import Alert from "../../../../common/components/Alert/Alert";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Categoryname: "",

      AlertMsg: "",
      AlertMsgType: "",
    };
  }

  componentDidMount() {
    console.log("i am componentDidMount");
  }

  onChangeHandler = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
      reload: true,
    });

    console.log(this.state.Categoryname);
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log("i am ADDCategory.js ");

    console.log(localStorage.getItem("AdminLogin"), "i am token AddCategory");

    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("AdminLogin"),
      },
    };

    let bodyData = {
      Categoryname: this.state.Categoryname,
    };

    axios
      .post(
        "https://still-peak-54145.herokuapp.com/api/category",
        bodyData,
        axiosConfig,
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          AlertMsg: res.data,
          AlertMsgType: "success",
          Categoryname: "",
        });
        setTimeout(() => {
          this.setState({
            AlertMsg: "",
          });
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        this.setState({
          AlertMsg: error.response.data,
          AlertMsgType: "danger",
          Categoryname: "",
        });
        setTimeout(() => {
          this.setState({
            AlertMsg: "",
          });
        }, 3000);
      });
  };

  render() {
    console.log(this.state);
    return (
      <Fragment>
        <div>
          {this.state.AlertMsg != "" ? (
            <Alert
              msg={this.state.AlertMsg}
              msgType={this.state.AlertMsgType}
              marginDetail="50px 0px;"
            />
          ) : null}
        </div>

        <div className="FormContainer marginTop-50">
          <div className="tableName text-700">
            <p>Add Category</p>

            <form className="marginTop-20" onSubmit={this.onSubmit}>
              <div className="formGridName">
                <p className="formLable">Name</p>
                <input
                  className="formInput"
                  type="text"
                  value={this.state.Categoryname}
                  name="Categoryname"
                  placeholder="Product Name"
                  onChange={this.onChangeHandler}
                  required
                />
              </div>
              <div className="margin-50" style={{ marginLeft: "80px" }}>
                <div className="formBtn btn_cancle">
                  <p className="Btntext">Cancle</p>
                </div>

                <div>
                  <input
                    className="formBtn btn_submit Btntext"
                    type="submit"
                    value="ADD"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AddCategory;
