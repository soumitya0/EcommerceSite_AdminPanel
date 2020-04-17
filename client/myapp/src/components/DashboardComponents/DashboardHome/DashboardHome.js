import React, { Component, Fragment } from "react";
import TopCard from "../../../common/components/Dashboard/TopCard";
import DashBoardProductoutofStock from "../DashBoardProduct/ProductOutofStock/DashBoardProductoutofStock";
import PendingOrders from "../DashBoardProduct/PendingOrders/PendingOrders";

class DashboardHome extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="text-gray text-700">Dashboard</h1>
        <p className="marginTop-10">
          Summary and overview of our admin stuff here
        </p>

        <div className="GridCardInfo marginTop-20">
          <div>
            <TopCard />
          </div>
          <div>
            <TopCard />
          </div>
          <div>
            <TopCard />
          </div>
        </div>

        <div className="GridCardInfo marginTop-50">
          <div>
            <TopCard />
          </div>
          <div>
            <TopCard />
          </div>
        </div>

        {/* Product List */}

        <div className="GridTableInfo marginTop-20">
          <div>
            <DashBoardProductoutofStock />
          </div>
          <div>
            <PendingOrders />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DashboardHome;
