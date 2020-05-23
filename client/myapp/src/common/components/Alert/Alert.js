import React, { Component } from "react";

import "./AlertStyle.css";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: this.props.msg,
      msgType: this.props.msgType,
    };
  }

  setAlert = () => {
    if (this.state.msg != "") {
      return (
        <div>
          <div class={`error-${this.state.msgType} `}>
            <i class="fa fa-info-circle"></i>
            {this.state.msg}.
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div style={{ margin: this.props.marginDetail }}>{this.setAlert()}</div>
    );
  }
}

export default Alert;
