import React, { Component, Fragment } from "react";

import "./TopMenuAccountStyle.css";
class TopMenuAccount extends Component {
  render() {
    return (
      <Fragment>
        <li className="nav-item">
          <div className="nav-link">
            <span className="TopMenuAccountEmail">
              soumityachauhan1234@gmail.com
            </span>
            <img
              className="img-profile rounded-circle"
              src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
            />
          </div>
        </li>
      </Fragment>
    );
  }
}

export default TopMenuAccount;
