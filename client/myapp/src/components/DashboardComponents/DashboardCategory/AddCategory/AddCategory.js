import React, { Component, Fragment } from "react";
import "./AddCategoryStyle.css";

import axios from "axios";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Categoryname: "",
    };
  }

  onChangeHandler = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });

    console.log(this.state.Categoryname);
  };

  onSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <Fragment>
        <div className="FormContainer marginTop-50">
          <div className="tableName text-700">
            <p>Add Category</p>

            <form className="marginTop-20" onSubmit={this.onSubmit}>
              <div className="formGridName">
                <p className="formLable">Name</p>
                <input
                  className="formInput"
                  type="text"
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
                    value="Login"
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
