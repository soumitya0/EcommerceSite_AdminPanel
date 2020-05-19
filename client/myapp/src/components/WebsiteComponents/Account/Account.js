import React, { Component } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import { Redirect } from "react-router-dom";
//Sechema

import "./AccountStyle.css";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    console.log(localStorage.getItem("UserToken"), "USER LOGIN :");
    let axiosConfig = {
      headers: {
        "X-Auth-Token": localStorage.getItem("UserToken"),
      },
    };

    axios.get("/api/user", axiosConfig).then((res) => {
      console.log(res.data);
      this.setState({
        data: res.data,
      });

      console.log(this.state.data, " STATE USER DATA");
    });
  }

  render() {
    console.log(localStorage.getItem("Login"));

    return (
      <div>
        <div>
          <div className="Account_menu">
            <div className="display_userInfo">
              <div className="display_userInfo_grid">
                <div className="display_userInfo_pic">
                  <i className="fas fa-user"></i>
                </div>
                <div className="display_userInfo_username ">
                  <div>
                    <p>{this.state.data.UserName}</p>
                  </div>
                </div>
                <div className="display_userInfo_userEmail ">
                  <div>
                    <p>{this.state.data.UserEmail}</p>
                  </div>
                </div>
              </div>

              <hr className="sidebar-divider" />

              <ul className="display_userInfo_ul margin-20 ">
                <h5>My order</h5>
                <hr className="sidebar-divider" />

                <Link to="/myOrder">
                  <li className="display_userInfo_li margin-10">My order</li>
                </Link>

                <hr className="sidebar-divider" />

                <li
                  className="display_userInfo_li margin-10"
                  onClick={this.LogOut}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
        ;
      </div>
    );
  }
}

export default Account;
