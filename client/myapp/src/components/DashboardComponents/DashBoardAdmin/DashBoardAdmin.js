import React, { Component, Fragment } from "react";

import TopCard from "../../../common/components/Dashboard/TopCard";

class DashBoardAdmin extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <h1 className="text-gray text-700">Admin</h1>
          <p className="marginTop-10">Admin here</p>
          <div className="GridCardInfo marginTop-20">
            <div>
              <TopCard />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DashBoardAdmin;
