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

            <i class="fas fa-user-tie img-profile rounded-circle"></i>
          </div>
        </li>
      </Fragment>
    );
  }
}

export default TopMenuAccount;
