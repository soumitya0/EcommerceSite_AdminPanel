import React, { Component, Fragment } from "react";

import "./CategoryViewStyle.css";

import axios from "axios";

class CategoryView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: this.props.api,
      data: [],
    };
  }

  componentDidMount() {
    console.log(this.state.api, "API");

    axios
      .get(this.state.api)
      .then((res) => {
        console.log(res.data, "CATAGORY DATA ");
        this.setState({
          data: res.data,
        });
      })
      .then((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.api, "API STATE");
    return (
      <Fragment>
        <div className="CategoryGrid">
          <div className="CategoryView-img">
            <div className="CategoryViewImage">
              <img className="CategoryImg" src={this.props.imageUrl} />
            </div>
          </div>

          <div className="CategoryView-name">
            <p className="CategoryView-nameText">{this.props.Categoryname}</p>
          </div>
          <div className="CategoryView-ItemCount">
            <p className="CategoryView-ItemCountText">
              {" "}
              {this.state.data.length} <span>item</span>
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CategoryView;
