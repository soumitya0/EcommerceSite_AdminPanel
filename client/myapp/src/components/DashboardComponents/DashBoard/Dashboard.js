import React, { Component, Fragment } from "react";

import { Switch, Route } from "react-router-dom";

import "./DashboardStyle.css";
import LeftBar from "../LeftBar/LeftBar";
import TopBar from "../TopBar/TopBar";
import DashBoardAddProduct from "../DashBoardProduct/AddProduct/DashBoardAddProduct";
import DashboardHome from "../DashboardHome/DashboardHome";
import DashBoardManageProduct from "../DashBoardManageProduct/DashBoardManageProduct";
import DashBoardOrder from "../DashBoardOrders/DashBoardOrder";
import DashBoardCategory from "../DashboardCategory/DashBoardCategory";
import DashBoardAdmin from "../DashBoardAdmin/DashBoardAdmin";
import DashboardProduct from "../DashBoardProduct/DashboardProduct";
import { Redirect } from "react-router-dom";

//AXIOS
import axios from "axios";
import EditProduct from "../DashBoardManageProduct/EditProduct/EditProduct";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CountProduct: "",
      OutofStock: [],
      StockAvailabel: [],
      TotalOrderPending: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://still-peak-54145.herokuapp.com/api/product/stock/OutofStock",
      )
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
      .get("https://still-peak-54145.herokuapp.com/api/product/stock/available")
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
    if (localStorage.getItem("AdminLogin") == null) {
      return (
        <Redirect
          to={{
            pathname: "/DashboardLogin",
            state: {
              working: "i am working",
            },
          }}
        />
      );
    } else {
      return (
        <Fragment>
          <div className="gridDashboard">
            <div className="DashBoardGrid1">
              <LeftBar />
            </div>
            <div className="DashBoardGrid2">
              <TopBar />
            </div>

            <div className="DashBoardGrid3">
              <div className="container">
                <h2>In side the display container</h2>

                {/* this are the Route that will be display in display container  */}
                <Switch>
                  <Route path="/dashboard" exact>
                    <DashboardHome />
                  </Route>

                  <Route path="/dashboard/addProducts" exact>
                    <DashboardProduct />
                  </Route>

                  <Route path="/dashboard/manageProduct" exact>
                    <DashBoardManageProduct />
                  </Route>

                  <Route path="/dashboard/orders" exact>
                    <DashBoardOrder />
                  </Route>

                  <Route path="/dashboard/category" exact>
                    <DashBoardCategory />
                  </Route>

                  <Route path="/dashboard/ADMIN" exact>
                    <DashBoardAdmin />
                  </Route>

                  <Route path="/dashboard/editProduct" exact>
                    <EditProduct />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default Dashboard;
