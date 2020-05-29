import React, { Component, Fragment } from "react";
import axios from "axios";

import "./RegisterStyle.css";
import { Redirect } from "react-router-dom";
import Alert from "../../../common/components/Alert/Alert";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      register: false,
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

    console.log(this.state.name);
    console.log(this.state.email);
    console.log(this.state.password);

    console.log(this.state.confirmPassword);
  };

  onSubmit = async (event) => {
    console.log("i am clicked");
    event.preventDefault();

    if (this.state.password == this.state.confirmPassword) {
      axios
        .post("https://still-peak-54145.herokuapp.com/api/user", {
          UserName: this.state.name,
          UserEmail: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          console.log(res.data);

          this.setState({
            AlertMsg: res.data.msg,
            AlertMsgType: "success",
            register: true,
          });
          setTimeout(() => {
            this.setState({
              AlertMsg: "",
            });
          }, 3000);
        })

        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          this.setState({
            AlertMsg: error.response.data.msg,
            AlertMsgType: "danger",
          });
          setTimeout(() => {
            this.setState({
              AlertMsg: "",
            });
          }, 3000);
        });
    } else {
      alert("Password fail");
      this.setState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        login: false,
      });
    }
  };

  render() {
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
              src={require("../../../assets/Website/register.jpg")}
              alt="RegisterImg"
            />
          </div>

          {!this.state.register ? (
            <form onSubmit={this.onSubmit}>
              <div className="FormGrid">
                <div>
                  <div className="formGridEmail">
                    <p className="formLable">Full Name</p>
                    <input
                      className="formInput"
                      type="text"
                      name="name"
                      value={this.state.name}
                      placeholder="name "
                      onChange={this.changeHandle}
                      required
                    />
                  </div>
                </div>

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
                      className="formInput formPassword"
                      name="password"
                      type="password"
                      value={this.state.password}
                      placeholder="Password"
                      onChange={this.changeHandle}
                      required
                    />

                    <input
                      className="formInput formConfirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={this.state.confirmPassword}
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
                    value="Register"
                  />
                </div>
              </div>
            </form>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  working: "i am working",
                },
              }}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

export default Register;
