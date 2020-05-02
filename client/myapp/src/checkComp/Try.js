import React, { Component } from "react";
import Pagination from "react-js-pagination";

class Try extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
    return <div></div>;
  }
}
export default Try;
