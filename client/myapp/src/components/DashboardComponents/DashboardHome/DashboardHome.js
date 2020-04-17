import React, { Component, Fragment } from "react";

class DashboardHome extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="text-gray text-700">Dashboard</h1>
        <p className="marginTop-10">
          Summary and overview of our admin stuff here
        </p>
      </Fragment>
    );
  }
}

export default DashboardHome;
