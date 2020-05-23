import React, { Component, Fragment } from "react";

import "./DashBoardLoginStyle.css";

import axios from "axios";

import { Redirect } from "react-router-dom";
import Alert from "../../../common/components/Alert/Alert";

class DashBoardLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

      isLogin: false,
      token: "",

      AlertMsg: "",
    };
  }

  onChangeHandler = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });

    console.log(this.state.email);
    console.log(this.state.password);
  };

  onSubmit = (event) => {
    console.log("i am clicked From DashboardLogin.js");
    event.preventDefault();

    console.log(this.state);

    axios
      .post("https://still-peak-54145.herokuapp.com/api/admin/login", {
        AdminEmail: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log("axios");
        console.log(res.data.token);
        const token = res.data.token;
        localStorage.setItem("AdminLogin", token);

        this.setState({
          isLogin: true,
          token: token,
        });
      })
      .catch((err) => {
        console.log(err.response.data);

        this.setState({
          AlertMsg: err.response.data.msg,
          isLogin: false,
          email: "",
          password: "",
        });

        setTimeout(() => {
          this.setState({
            AlertMsg: "",
          });
        }, 3000);
      });
  };

  render() {
    console.log(this.state, "islogin");
    if (localStorage.getItem("AdminLogin") == null) {
      return (
        <div>
          {this.state.AlertMsg != "" ? (
            <Alert
              msg={this.state.AlertMsg}
              msgType="danger"
              marginDetail="-50px 350px"
            />
          ) : null}

          <Fragment>
            <div className="DashBoardLoginGrid">
              <div
                className="DashBoardLoginGrid-Img"
                style={{ backgroundColor: "black" }}
              ></div>

              <form className="DashBoardLogin-Form" onSubmit={this.onSubmit}>
                <div>
                  <div className="Insideform">
                    <p className="formLable">Email</p>
                    <input
                      className="formInput"
                      type="email"
                      name="email"
                      placeholder="Email id"
                      value={this.state.email}
                      onChange={this.onChangeHandler}
                      required
                    />
                  </div>
                </div>

                <div>
                  <p className="formLable">Password</p>
                  <input
                    className="formInput"
                    type="password"
                    name="password"
                    placeholder="Password "
                    onChange={this.onChangeHandler}
                    value={this.state.password}
                    required
                  />
                </div>

                <div>
                  <input
                    className="Btn_Login_form"
                    type="submit"
                    value="Login"
                  />
                </div>
              </form>
            </div>
          </Fragment>
        </div>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/Dashboard",
            state: {
              working: "i am working",
            },
          }}
        />
      );
    }
  }
}

export default DashBoardLogin;
