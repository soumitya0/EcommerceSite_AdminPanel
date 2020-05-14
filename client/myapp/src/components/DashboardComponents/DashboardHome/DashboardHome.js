import React, { Component, Fragment } from "react";
import TopCard from "../../../common/components/Dashboard/TopCard";
import DashBoardProductoutofStock from "../DashBoardProduct/ProductOutofStock/DashBoardProductoutofStock";
import PendingOrders from "../DashBoardOrders/PendingOrders/PendingOrders";

import axios from "axios";
class DashboardHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CountProduct: "",
      OutofStock: [],
      StockAvailabel: [],
      TotalOrderPending: "",
      AllProduct: [],
    };
  }

  componentDidMount() {
    axios
      .get("api/product/stock/OutofStock")
      .then((res) => {
        console.log(res.data, "OUT-OF-STOCK");
        this.setState({
          OutofStock: res.data,
        });
        console.log(this.state.OutofStock, "STATE OUT-OF-STOCK");
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    axios
      .get("/api/addproduct/data")
      .then((res) => {
        console.log(res.data, "ALL Product");
        this.setState({
          AllProduct: res.data,
        });
        console.log(this.state.AllProduct, "STATE AllProduct");
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    const availabel = axios
      .get("/api/product/stock/available")
      .then((res) => {
        console.log(res.data, "AVAILABLE ");

        this.setState({
          StockAvailabel: res.data,
        });

        console.log(this.state.StockAvailabel, "STATE - AVAILABLE ");
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
        <h1 className="text-gray text-700">Dashboard</h1>
        <p className="marginTop-10">
          Summary and overview of our admin stuff here
        </p>

        <div className="GridCardInfo marginTop-20">
          <div>
            <TopCard
              name="PRODUCT COUNT"
              value={this.state.AllProduct.length}
              imgName="fas fa-shopping-basket"
              lineColor="CARD-BLUE"
            />
          </div>
          <div>
            <TopCard
              name="STOCK COUNT"
              value={this.state.StockAvailabel.length}
              imgName="fas fa-cubes"
              lineColor="CARD-GREEN"
            />
          </div>
          <div>
            <TopCard
              name="OUT OF STOCK"
              value={this.state.OutofStock.length}
              imgName="far fa-circle"
              lineColor="CARD-RED"
            />
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
            <DashBoardProductoutofStock
              OutofStockData={this.state.OutofStock}
              name="soumitya"
            />
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
