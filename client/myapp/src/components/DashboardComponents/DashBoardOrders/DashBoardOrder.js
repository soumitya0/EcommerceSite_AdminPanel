import React, { Component, Fragment } from "react";
import TopCard from "../../../common/components/Dashboard/TopCard";
import ListOfOrders from "./List_of_Orders/ListOfOrders";
import PendingOrders from "./PendingOrders/PendingOrders";
import DashBoardProductoutofStock from "../DashBoardProduct/ProductOutofStock/DashBoardProductoutofStock";
class DashBoardOrder extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="text-gray text-700">Products</h1>
        <p className="marginTop-10">Products here</p>
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

        <ListOfOrders />
      </Fragment>
    );
  }
}

export default DashBoardOrder;
