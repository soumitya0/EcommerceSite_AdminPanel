import React, { Component, Fragment } from "react";
import "./topBarStyle.css";

import { Link } from "react-router-dom";

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLoaction: "Faridabad",
      showMenu: false,
    };
  }

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

  render() {
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
            <i class=" mapMarker fas fa-map-marker-alt  ">
              {this.state.userLoaction}
            </i>
          </div>
          <div style={{ backgroundColor: "gray" }}>
            <h4>Search BAR</h4>
          </div>

          <div className="Login-Register">
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

            {this.state.showMenu ? (
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
            ) : null}
          </div>
          <div></div>
        </div>
      </Fragment>
    );
  }
}

export default TopBar;
