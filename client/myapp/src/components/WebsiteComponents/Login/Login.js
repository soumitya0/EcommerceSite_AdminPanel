import React, { Component, Fragment } from "react";
import axios from "axios";

import "./LoginStyle.css";
import { Redirect } from "react-router-dom";
import Alert from "../../../common/components/Alert/Alert";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      login: false,
      stor: "",

      AlertMsg: "",
      AlertMsgType: "",
    };
  }

  changeHandle = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
    console.log(this.state.email);
    console.log(this.state.password);
  };

  onSubmit = async (event) => {
    console.log("i am clicked");
    event.preventDefault();

    axios
      .post("https://still-peak-54145.herokuapp.com/api/user/login", {
        UserEmail: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res.data.token);
        const token = res.data.token;
        localStorage.setItem("UserToken", token);
        console.log(localStorage.getItem("UserToken"), "TOKEN");

        this.setState({
          AlertMsg: res.data.msg,
          AlertMsgType: "success",
          login: true,
        });
        setTimeout(() => {
          this.setState({
            AlertMsg: "",
          });
        }, 3000);

        console.log(this.state.login);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          AlertMsg: error.response.data.msg,
          AlertMsgType: "danger",
          login: false,
        });
        setTimeout(() => {
          this.setState({
            AlertMsg: "",
          });
        }, 3000);
      });
  };

  render() {
    console.log(this.state, "LOGIN JS");

    if (localStorage.getItem("UserToken") != null) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              working: "i am working",
            },
          }}
        />
      );
    } else {
      return (
        <Fragment>
          <div className="alertDivSection">
            {this.state.AlertMsg != "" ? (
              <Alert
                msg={this.state.AlertMsg}
                msgType={this.state.AlertMsgType}
                marginDetail="50px 0px;"
              />
            ) : null}
          </div>
          <div className="LoginGrid">
            <div className="GridLoginImg">
              <img
                className="bg-login-image"
                src={require("../../../assets/Website/login.jpg")}
                alt="LoginImg"
              />
            </div>

            {this.state.login == false ? (
              <form onSubmit={this.onSubmit}>
                <div className="FormGrid">
                  <div>
                    <div className="formGridEmail">
                      <p className="formLable">Email</p>
                      <input
                        className="formInput"
                        type="email"
                        name="email"
                        value={this.state.email}
                        placeholder="Email id"
                        onChange={this.changeHandle}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="formGridPassword">
                      <p className="formLable">Password</p>
                      <input
                        className="formInput"
                        name="password"
                        type="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.changeHandle}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      className="Btn_Login_form"
                      type="submit"
                      value="Login"
                    />
                    >
                  </div>
                </div>
              </form>
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            )}
          </div>
        </Fragment>
      );
    }
  }
}

export default Login;
