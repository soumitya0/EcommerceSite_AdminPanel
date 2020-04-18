import React, { Component, Fragment } from "react";
import "./AddCategoryStyle.css";
class AddCategory extends Component {
  render() {
    return (
      <Fragment>
        <div className="FormContainer marginTop-50">
          <div className="tableName text-700">
            <p>Add Category</p>

            <form className="marginTop-20">
              <div className="formGridName">
                <p className="formLable">Name</p>
                <input
                  className="formInput"
                  type="text"
                  placeholder="Product Name"
                />
              </div>
              <div className="margin-50" style={{ marginLeft: "80px" }}>
                <div className="formBtn btn_cancle">
                  <p className="Btntext">Cancle</p>
                </div>

                <div className="formBtn btn_submit ">
                  <p className="Btntext">ADD</p>
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
