import React, { Component, Fragment } from "react";
import "./PaginationItemstyle.css";
class PaginationItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lengt: [],
    };

    // {
    //   [...Array(5)].map(() => console.log("Hello"));
    // }
  }

  //   displayName = () => {
  //     console.log("i am soumitya ");
  //   };

  render() {
    let row = [];
    for (let i = 0; i < 10; i++) {
      row.push(
        <li>
          <a href="#">{i}</a>{" "}
        </li>,
      );
    }
    return (
      <Fragment>
        {/* {this.displayName()} */}
        {/* <div class="pagination">{row}</div> */}
      </Fragment>
    );
  }
}

export default PaginationItem;
