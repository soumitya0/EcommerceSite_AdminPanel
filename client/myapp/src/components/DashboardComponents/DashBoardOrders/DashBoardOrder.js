import React, { Component, Fragment } from "react";
import TopCard from "../../../common/components/Dashboard/TopCard";
import ListOfOrders from "./List_of_Orders/ListOfOrders";
import PendingOrders from "./PendingOrders/PendingOrders";
import DashBoardProductoutofStock from "../DashBoardProduct/ProductOutofStock/DashBoardProductoutofStock";

import axios from "axios";
class DashBoardOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingOrder: [],
      onWayOrder: [],
      deliverOrder: [],
    };
  }

  componentDidMount() {
    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("AdminLogin"),
      },
    };

    // PENDING ORDERS
    axios
      .get("/api/order/pending/data", axiosConfig)
      .then((res) => {
        console.log(res.data, "PENDING DATA ");
        this.setState({
          pendingOrder: res.data,
        });

        console.log(this.state.pendingOrder, "STATE DATA ");
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    // ON-WAY ORDERS/
    axios
      .get("/api/order/onway/data", axiosConfig)
      .then((res) => {
        console.log(res.data, "onway DATA ");
        this.setState({
          onWayOrder: res.data,
        });

        console.log(this.state.onWayOrder, "STATE DATA ");
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    // DELIVERED ORDERS
    axios
      .get("/api/order/delivered/data", axiosConfig)
      .then((res) => {
        console.log(res.data, "delivered DATA ");
        this.setState({
          deliverOrder: res.data,
        });

        console.log(this.state.deliverOrder, "STATE DATA ");
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  render() {
    return (
      <Fragment>
        <h1 className="text-gray text-700">Products</h1>
        <p className="marginTop-10">Products here</p>
        <div className="GridCardInfo marginTop-20">
          <div>
            <TopCard
              name="PENDING ORDERS"
              value={this.state.pendingOrder.length}
              imgName="fas fa-cubes"
              lineColor="CARD-RED"
            />
          </div>
          <div>
            <TopCard
              name="ON-WAY ORDERS"
              value={this.state.onWayOrder.length}
              imgName="fas fa-cubes"
              lineColor="CARD-YELLOW"
            />
          </div>
          <div>
            {" "}
            <TopCard
              name="DELIVERED ORDERS"
              value={this.state.deliverOrder.length}
              imgName="fas fa-cubes"
              lineColor="CARD-GREEN"
            />
          </div>
        </div>

        <ListOfOrders />
      </Fragment>
    );
  }
}

export default DashBoardOrder;
