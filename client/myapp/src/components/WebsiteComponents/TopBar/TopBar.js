import React, { Component, Fragment } from "react";
import "./topBarStyle.css";

import { Link } from "react-router-dom";
import axios from "axios";

import { Redirect } from "react-router-dom";
import Account from "../Account/Account";

class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    userLoaction: "Faridabad",
    showMenu: false,
    find: "",
    data: [],

    login: false,
  };

  showMenu = (event) => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  };

  onChangeHandler = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });

    console.log(this.state.find);
  };

  myOrder = () => {};

  onSubmit = (e) => {
    e.preventDefault();

    axios(
      `https://still-peak-54145.herokuapp.com/api/search/${this.state.find.toLowerCase()}`,
    )
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data,
        });

        console.log(this.state.data, "state");
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
      });
  };

  demoMethod() {
    console.log(this.state.data, "demoMethod");
    this.props.sendData(this.state.data);
  }

  render() {
    this.demoMethod();
    return (
      <Fragment>
        <div className="Client_TopbarGrid">
          <Link to="/">
            <div className="itemImg">
              <img
                className="ImgTop"
                src={require("../../../assets/Website/Home.png")}
                alt="home"
              />
            </div>
          </Link>

          <div className="mapMarkerLoaction">
            <h2 style={{ color: "#fff" }}>
              {" "}
              Soumitya <sup>Store</sup>
            </h2>
            <h6
              style={{
                color: "#51DB94",
                marginLeft: "10px",
              }}
            >
              Contact us : +91 9547147881
            </h6>
          </div>
          <div>
            <p>
              <form onSubmit={this.onSubmit}>
                <div>
                  <input
                    className="formInput"
                    type="text"
                    name="find"
                    style={{ width: "90%" }}
                    placeholder="Search Product.."
                    onChange={this.onChangeHandler}
                  />

                  <span>
                    <button
                      type="submit"
                      style={{ height: "40px", width: "40px" }}
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </form>
            </p>
          </div>

          <div className="Login-Register">
            {/* LOGIN AND REGISTER */}

            {localStorage.getItem("UserToken") ? (
              <div className="Register_topbar" onClick={this.showMenu}>
                <h6>Welcome to </h6>

                <h6>
                  MyAccount{" "}
                  <span>
                    {" "}
                    <i class="fas fa-sort-down" />
                  </span>
                </h6>
              </div>
            ) : (
              <div className="Register_topbar" onClick={this.showMenu}>
                <h6>MyAccount</h6>

                <h6>
                  Login/Signup{" "}
                  <span>
                    {" "}
                    <i class="fas fa-sort-down" />
                  </span>
                </h6>
              </div>
            )}

            {/* DROP DOWN MENU */}

            {this.state.showMenu ? (
              localStorage.getItem("UserToken") ? (
                <Account />
              ) : (
                <div className="menuItem">
                  <div>
                    <Link to="/login">
                      <div className="AccountBtn loginbtn marginTop-10">
                        Login
                      </div>
                    </Link>

                    <Link to="/register">
                      <div className="AccountBtn loginbtn marginTop-20">
                        Register
                      </div>
                    </Link>
                  </div>
                </div>
              )
            ) : null}
          </div>

          {/* ADD TO CART */}
          {localStorage.getItem("UserToken") != null ? (
            <Link to="/myOrder">
              <div className="myorder_grid">
                <i class="fas fa-shopping-basket basketImg"></i>
                <h5 className="myorderText">My Order</h5>
              </div>
            </Link>
          ) : null}
        </div>
      </Fragment>
    );
  }
}

export default TopBar;
