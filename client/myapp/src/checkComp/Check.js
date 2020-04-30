import React, { Component } from "react";

class Check extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testing: "",
    };
  }

  componentDidMount() {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://safe-cove-81142.herokuapp.com/testing",
      {},
    ).then((response) =>
      response.text().then((data) => {
        console.log(data);
        this.setState({ testing: data });
      }),
    );
  }

  render() {
    return (
      <div>
        <h1>customer</h1>
        <h2>{this.state.testing}</h2>
      </div>
    );
  }
}
export default Check;
