import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import "./LeftbarStyle.css";

class LeftBar extends Component {
  render() {
    return (
      <Fragment>
        <ul className="navbar-nav sidebar bg-gradient-primary-green ">
          <div className="sidebar-brand-text LeftbarMargin">
            Soumitya <sup>Store</sup>
          </div>

          <hr className="sidebar-divider " />

          <li className="nav-item LeftbarMargin">
            <Link className="nav-link" to="/dashboard">
              <i class="fas fa-tachometer-alt LeftBarIcon"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <hr className="sidebar-divider" />
          <div className="sidebar-heading LeftbarMargin">Warehouse</div>

          <li className="nav-item LeftbarMargin">
            <Link className="nav-link" to="/dashboard/addProducts">
              <i class="fas fa-cart-plus LeftBarIcon "></i>
              <span>Add Product</span>
            </Link>
          </li>

          <li className="nav-item LeftbarMargin">
            <Link className="nav-link" to="/dashboard/manageProduct">
              <i class="fas fa-cogs LeftBarIcon"></i>

              <span>manageProduct</span>
            </Link>
          </li>

          <li className="nav-item LeftbarMargin">
            <Link className="nav-link" to="/dashboard/orders">
              <i class="fas fa-dollar-sign LeftBarIcon"></i>

              <span>orders</span>
            </Link>
          </li>

          <li className="nav-item LeftbarMargin">
            <Link className="nav-link" to="/dashboard/category">
              <i class="fas fa-list LeftBarIcon"></i>
              <span>category</span>
            </Link>
          </li>

          <hr className="sidebar-divider" />
          <div className="sidebar-heading LeftbarMargin">ADMIN</div>

          <li className="nav-item LeftbarMargin">
            <Link className="nav-link" to="/dashboard/ADMIN">
              <i class="fas fa-users-cog LeftBarIcon"></i>

              <span>ADMIN</span>
            </Link>
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default LeftBar;
