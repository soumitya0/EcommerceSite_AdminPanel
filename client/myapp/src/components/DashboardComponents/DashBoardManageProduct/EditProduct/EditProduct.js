import React, { Component, Fragment } from "react";

import "./EditProductStyle.css";

import axios from "axios";

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: this.props.editData.productName,
      productDescrption: this.props.editData.productDescrption,
      productImage: this.props.editData.productImage,
      productCategory: this.props.editData.productCategory,
      productWeight: this.props.editData.productWeight,
      productPrice: this.props.editData.productPrice,
      priceWithWeight: this.props.editData.priceWithWeight,
      productMaxSellingWeight: this.props.editData.productMaxSellingWeight,
      stock: this.props.editData.stock,
      _id: this.props.editData._id,

      schemasCategory: [],
      Selectedfile: "",
      imgRef: "",

      selectImg: this.props.editData.productImage,
    };
  }

  componentDidMount() {
    axios
      .get("https://still-peak-54145.herokuapp.com/api/category")
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

    console.log(this.props.editData, "EDIT_PRODUCT");
    console.log(this.state, "I AM STATE");
  }

  onChangeImgHandler = (e) => {
    console.log(e.target.files[0]);

    console.log(URL.createObjectURL(e.target.files[0]), "URL");
    this.setState({
      Selectedfile: e.target.files[0],

      imgRef: URL.createObjectURL(e.target.files[0]),
    });
  };

  changeHandle = (event) => {
    console.log("ONCHANGE HANDLER");
    //console.log(event.target);

    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });

    console.log(this.state, "i AM ON_CHANGE HANDLER");
    this.setState({
      priceWithWeight: `${this.state.productWeight} ₹${this.state.productPrice}`,
    });
  };

  onSubmit = async (event) => {
    console.log("i am clicked");
    event.preventDefault();
    console.log(localStorage.getItem("AdminLogin"));

    const bodyData = {
      productName: this.state.productName,
      productDescrption: this.state.productDescrption,
      productCategory: this.state.productCategory,
      productWeight: this.state.productWeight,
      productPrice: this.state.productPrice,
      priceWithWeight: this.state.priceWithWeight,
      productMaxSellingWeight: this.state.productMaxSellingWeight,
      stock: this.state.stock,
    };

    console.log(bodyData, "I AM BODY DATA");

    const fd = new FormData();
    fd.append("image", this.state.Selectedfile, this.state.Selectedfile.name);
    fd.append("productName", this.state.productName);
    fd.append("productDescrption", this.state.productDescrption);
    fd.append("productCategory", this.state.productCategory);
    fd.append("productWeight", this.state.productWeight);
    fd.append("productPrice", this.state.productPrice);
    fd.append("priceWithWeight", this.state.priceWithWeight);
    fd.append("productMaxSellingWeight", this.state.productMaxSellingWeight);
    fd.append("stock", this.state.stock);

    // console.log(fd, "FormData");

    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("AdminLogin"),
      },
    };

    axios
      .put(
        `https://still-peak-54145.herokuapp.com/api/product/editProduct/${this.state._id}`,
        fd,
        axiosConfig,
      )
      .then((res) => {
        console.log("API");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
      });
  };

  render() {
    console.log(this.props.editData, "EDIT_PRODUCT");
    console.log(this.state.productName, "PRODUCT NAME");
    console.log(this.state, "STATE__");
    console.log(this.state.Selectedfile, "SELECTE_FILE");
    return (
      <Fragment>
        <div className="EditContainer">
          <form
            className="EditContainer-Grid"
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
          >
            <div>
              <p className="EditLable">Product Name</p>
              <input
                className="ContainerInput"
                type="text"
                name="productName"
                value={this.state.productName}
                onChange={this.changeHandle}
                placeholder="Product Name"
              />
            </div>
            <div>
              <p className="EditLable">Category</p>
              <select
                className="ContainerInput"
                name="productCategory"
                onChange={this.changeHandle}
                value={this.state.productCategory}
              >
                <option>Choose your option</option>

                {this.state.schemasCategory.map((item) => (
                  <option key={item._id} value={item.Categoryname}>
                    {item.Categoryname}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="EditLable">Select Image</p>
              <input
                className="ContainerInput"
                onChange={this.onChangeImgHandler}
                type="file"
                name="productImage"
                placeholder="Product Name"
              />
            </div>

            <div className="ContainerImg">
              <div className="formGridImagePreView">
                Image Preview
                <div className="formIcon">
                  {this.state.imgRef == "" ? (
                    <img
                      src={this.state.selectImg}
                      style={{
                        height: "150px",
                        width: "150px",
                        border: " 2px solid #000",
                        borderRadius: " 4px",
                        marginTop: "-10px",
                      }}
                    />
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
            </div>
            <div className="ContainerDes">
              <p className="EditLable">Descrption</p>
              <textarea
                name="productDescrption"
                onChange={this.changeHandle}
                className="ContainerInput"
                type="text"
                value={this.state.productDescrption}
                placeholder="Description...."
              />
            </div>

            <div>
              <p className="EditLable">Max Weight selling </p>
              <select
                className="ContainerInput"
                name="productMaxSellingWeight"
                onChange={this.changeHandle}
                value={this.state.productMaxSellingWeight}
              >
                <option>Choose your Weight</option>
                <option value="250grm">250grm</option>
                <option value="1kg">1kg</option>
                <option value="2kg">2kg</option>
                <option value="5kg">5kg</option>
              </select>
            </div>
            <div>
              <p className="EditLable-weight">Weight</p>
              <select
                className="ContainerInput-weight"
                name="productWeight"
                onChange={this.changeHandle}
                value={this.state.productWeight}
              >
                <option>Weight</option>
                <option value="250grm">250grm</option>
                <option value="1kg">1kg</option>
                <option value="5kg">5kg</option>
              </select>
            </div>

            <div>
              <p className="EditLable-Price">Price</p>
              <input
                className="ContainerInput-Price"
                onChange={this.changeHandle}
                name="productPrice"
                type="text"
                placeholder={`INR`}
                value={this.state.productPrice}
              />
            </div>

            <div>
              <p className="EditLable">Stock</p>
              <select
                className="ContainerInput"
                name="stock"
                onChange={this.changeHandle}
                value={this.state.stock}
              >
                <option>Choose Stock</option>
                <option value="available">available</option>
                <option value="OutofStock">Out of Stock</option>
              </select>
            </div>
            <div className="ContainerAciton">
              <div className="formBtn btn_cancle">
                <p className="Btntext">Cancle</p>
              </div>
            </div>
            <div className="ContainerCancle">
              <div className="formBtn btn_submitEdit">
                <input className="Btntext" type="submit" value="Publish" />
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default EditProduct;
