import React, { Component, Fragment } from "react";

import "./TopBarStyle.css";
import TopMenuAccount from "./TopMenuAccount/TopMenuAccount";

class TopBar extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar bg-custom-dark topbar">
          <p style={{ color: "#fff" }}> home/list</p>

          <ul className="navbar-nav">
            <TopMenuAccount />
          </ul>
        </nav>
      </Fragment>
    );
  }
}

export default TopBar;
