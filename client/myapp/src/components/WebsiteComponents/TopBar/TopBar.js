import React, { Component, Fragment } from "react";
import "./topBarStyle.css";

import { Link } from "react-router-dom";
import axios from "axios";
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
          <div className="itemImg">
            <img
              className="ImgTop"
              src={require("../../../assets/Website/Home.png")}
              alt="home"
            />
          </div>

          <div className="mapMarkerLoaction">
            {/* <i class=" mapMarker fas fa-map-marker-alt  ">
              {this.state.userLoaction}
            </i> */}
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
                <h6>SOUMITYA</h6>

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
          <div></div>
        </div>
      </Fragment>
    );
  }
}

export default TopBar;
