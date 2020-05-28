import React, { Component, Fragment } from "react";

import "./ViewCategoryStyle.css";

import axios from "axios";

import ViewCategoryItem from "./ViewCategoryItem/ViewCategoryItem";

class ViewCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      categoryName: this.props.match.params.categoryName,
    };
  }

  componentDidUpdate() {
    axios
      .get(
        `https://still-peak-54145.herokuapp.com/api/category/${this.props.match.params.categoryName}`,
      )
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
    console.log(this.props, "VIEWCATEGORY");
    console.log(this.props.match.params.categoryName);
    console.log(this.state.categoryName);
    console.log(this.state.data);
    return (
      <Fragment>
        <div className="Category-Grid-Product">
          {this.state.data.length > 0
            ? this.state.data.map((product, index) => (
                <ViewCategoryItem key={index} item={this.state.data[index]} />
              ))
            : this.state.data.map((product, index) => (
                <ViewCategoryItem key={index} item={product} />
              ))}
        </div>
      </Fragment>
    );
  }
}
export default ViewCategory;
