import React, { Component, Fragment } from "react";

import "./SearchBarStyle.css";

import axios from "axios";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      find: "",
      data: [],
    };
  }

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
      `https://still-peak-54145.herokuapp.com/api/search/${this.state.find}`,
    )
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data,
        });

        console.log(this.state.data, "state");
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .catch((error) => {
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
        <p>
          <form onSubmit={this.onSubmit}>
            <div>
              <input
                type="text"
                name="find"
                placeholder="Search Product.."
                onChange={this.onChangeHandler}
              />

              <input type="submit" value="Search" />
            </div>
          </form>
        </p>
      </Fragment>
    );
  }
}

export default SearchBar;
