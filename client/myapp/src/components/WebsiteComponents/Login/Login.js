import React, { Component, Fragment } from "react";
import axios from "axios";

import "./LoginStyle.css";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      login: false,
      stor: "",
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
      .post("/api/user/login", {
        UserEmail: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res.data.token);
        const token = res.data.token;
        localStorage.setItem("UserToken", token);
        this.setState({
          login: true,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  render() {
    return (
      <Fragment>
        <div className="LoginGrid">
          <div className="GridLoginImg">
            <img
              className="bg-login-image"
              src={require("../../../assets/Website/login.jpg")}
              alt="LoginImg"
            />
          </div>

          {!this.state.login ? (
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

export default Login;
