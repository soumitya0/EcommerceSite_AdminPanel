import React, { Component, Fragment } from "react";

import "./MyorderStyle.css";
import axios from "axios";
import MyorderItem from "./MyorderItem/MyorderItem";
class Myorder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: [],
    };
  }

  componentDidMount() {
    console.log(localStorage.getItem("UserToken"), "USER LOGIN :");
    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("UserToken"),
      },
    };

    axios.get("/api/user/myorder/", axiosConfig).then((res) => {
      console.log(res.data, "ORDER DATA");
      this.setState({
        productData: res.data,
      });
    });
  }

  render() {
    console.log(this.state, "STATE");
    return (
      <Fragment>
        <div className="layoutUserOrder">
          {this.state.productData.map((post, index) => (
            <MyorderItem key={post._id} item={post} />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Myorder;
