import React, { Component, Fragment } from "react";

import "./DashBoardAddProductStyle.css";

import axios from "axios";

class DashBoardAddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: "",
      productDescrption: "",
      productImage: "",
      productCategory: "",
      productWeight: "",
      productPrice: "",
      productMaxSellingWeight: "",
      stock: "",

      Price: "",
      schemasCategory: [],
      Selectedfile: "",
      imgRef: "",
    };
  }

  componentDidMount() {
    axios
      .get("/api/category")
      .then((res) => {
        console.log(res.data, "Add Product");
        this.setState({
          schemasCategory: res.data,
        });
        // console.log(this.state.schemasCategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeHandle = (event) => {
    //console.log(event.target);

    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });

    console.log(this.state);
    this.setState({
      Price: `${this.state.productWeight} ₹${this.state.productPrice}`,
    });
  };

  onChangeImgHandler = (e) => {
    console.log(e.target.files[0]);

    console.log(URL.createObjectURL(e.target.files[0]), "URL");
    this.setState({
      Selectedfile: e.target.files[0],

      imgRef: URL.createObjectURL(e.target.files[0]),
    });
  };

  onSubmit = (event) => {
    console.log("i am clicked");
    event.preventDefault();
    console.log(localStorage.getItem("AdminLogin"));

    const bodyData = {
      productName: this.state.productName,
      productDescrption: this.state.productDescrption,
      productCategory: this.state.productCategory,
      productWeight: this.state.productWeight,
      productPrice: this.state.productPrice,
      productMaxSellingWeight: this.state.productMaxSellingWeight,
      stock: this.state.stock,
    };

    console.log(bodyData);
    const fd = new FormData();
    fd.append("image", this.state.Selectedfile, this.state.Selectedfile.name);

    fd.append("productName", this.state.productName);
    fd.append("productDescrption", this.state.productDescrption);
    fd.append("productCategory", this.state.productCategory);
    fd.append("productWeight", this.state.productWeight);

    fd.append("productPrice", this.state.Price);
    fd.append("productMaxSellingWeight", this.state.productMaxSellingWeight);
    fd.append("stock", this.state.stock);

    console.log(fd, "FormData");
    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("AdminLogin"),
      },
    };

    axios
      .post("/api/addproduct", fd, axiosConfig)
      .then((res) => {
        console.log("UI");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  render() {
    return (
      <Fragment>
        <div className="FormContainer marginTop-50">
          <div className="tableName text-700">
            <p>ADD PRODUCT </p>

            <form onSubmit={this.onSubmit} encType="multipart/form-data">
              <div className="formGrid marginTop-20">
                <div className="formGridImagePreView">
                  Image Preview
                  <div className="formIcon">
                    {this.state.imgRef == "" ? (
                      <i class="fas fa-camera-retro "></i>
                    ) : (
                      <img
                        src={this.state.imgRef}
                        style={{
                          height: "150px",
                          width: "150px",
                          border: " 2px solid #000",
                          borderRadius: " 4px",
                          marginTop: "-10px",
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="formGridName">
                  <p className="formLable">Name</p>
                  <input
                    className="formInput"
                    type="text"
                    name="productName"
                    onChange={this.changeHandle}
                    placeholder="Product Name"
                  />
                </div>

                <div className="formGridCategory">
                  <p className="formLable">Category</p>
                  <select
                    className="formInput"
                    name="productCategory"
                    onChange={this.changeHandle}
                  >
                    <option>Choose your option</option>

                    {this.state.schemasCategory.map((item) => (
                      <option key={item._id} value={item.Categoryname}>
                        {item.Categoryname}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="formGridImage">
                  <p className="formLable">Select Image</p>
                  <input
                    className="formInput"
                    onChange={this.onChangeImgHandler}
                    type="file"
                    name="productImage"
                    placeholder="Product Name"
                  />
                </div>

                <div className="formGridDescription">
                  <p className="formLable">Descrption</p>
                  <textarea
                    name="productDescrption"
                    onChange={this.changeHandle}
                    className="formInput"
                    type="text"
                    placeholder="Description...."
                  />
                </div>

                <div className="formGridWeight">
                  <p className="formLable ">Weight</p>
                  <select
                    className="productWeight"
                    name="productWeight"
                    onChange={this.changeHandle}
                  >
                    <option>Weight</option>
                    <option value="250grm">250grm</option>
                    <option value="1kg">1kg</option>
                    <option value="5kg">5kg</option>
                  </select>
                </div>

                <div className="formGridPrice">
                  <p className="formLable">Price</p>
                  <input
                    className="formInput"
                    onChange={this.changeHandle}
                    name="productPrice"
                    type="text"
                    placeholder={`INR`}
                  />
                </div>

                <div className="formGridWeight">
                  <p className="formLable">Max Weight for selling </p>
                  <select
                    className="formInput"
                    name="productMaxSellingWeight"
                    onChange={this.changeHandle}
                  >
                    <option>Choose your Weight</option>
                    <option value="250grm">250grm</option>
                    <option value="1kg">1kg</option>
                    <option value="2kg">2kg</option>
                    <option value="5kg">5kg</option>
                  </select>
                </div>

                <div className="formGridStock">
                  <p className="formLable">Stock</p>
                  <select
                    className="formInput"
                    name="stock"
                    onChange={this.changeHandle}
                  >
                    <option>Choose Stock</option>
                    <option value="Avaliable">Avaliable</option>
                    <option value="Out of Stock">Out of Stock</option>
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
                    <input className="Btntext" type="submit" value="Publish" />
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
