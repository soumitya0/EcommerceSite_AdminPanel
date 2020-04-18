import React, { Component, Fragment } from "react";

import "./DashBoardAddProductStyle.css";

class DashBoardAddProduct extends Component {
  render() {
    return (
      <Fragment>
        <div className="FormContainer marginTop-50">
          <div className="tableName text-700">
            <p>ADD PRODUCT </p>

            <form>
              <div className="formGrid marginTop-20">
                <div className="formGridImagePreView">
                  Image Preview
                  <div className="formIcon">
                    <i class="fas fa-camera-retro "></i>
                  </div>
                </div>

                <div className="formGridName">
                  <p className="formLable">Name</p>
                  <input
                    className="formInput"
                    type="text"
                    placeholder="Product Name"
                  />
                </div>

                <div className="formGridCategory">
                  <p className="formLable">Category</p>
                  <select className="formInput">
                    <option>Choose your option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </div>

                <div className="formGridImage">
                  <p className="formLable">Select Image</p>
                  <input
                    className="formInput"
                    type="file"
                    placeholder="Product Name"
                  />
                </div>

                <div className="formGridDescription">
                  <p className="formLable">Descrption</p>
                  <textarea
                    className="formInput"
                    type="text"
                    placeholder="Description...."
                  />
                </div>

                <div className="formGridWeight">
                  <p className="formLable">Weight</p>
                  <select className="formInput">
                    <option>Choose your Weight</option>
                    <option value="1">250grm</option>
                    <option value="2">1kg</option>
                    <option value="3">5kg</option>
                  </select>
                </div>

                <div className="formGridPrice">
                  <p className="formLable">Price</p>
                  <input className="formInput" type="text" placeholder="INR" />
                </div>

                <div className="formGridStock">
                  <p className="formLable">Stock</p>
                  <select className="formInput">
                    <option>Choose Stock</option>
                    <option value="1">Avaliable</option>
                    <option value="2">Out of Stock</option>
                  </select>
                </div>

                <div
                  className="formGridBtn"
                  style={{ margin: "30px 0px 0px 30px" }}
                >
                  <div className="formBtn btn_cancle">
                    <p className="Btntext">Cancle</p>
                  </div>

                  <div className="formBtn btn_submit">
                    <p className="Btntext">Save</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DashBoardAddProduct;
