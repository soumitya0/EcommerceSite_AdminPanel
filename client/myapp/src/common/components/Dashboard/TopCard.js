import React, { Component, Fragment } from "react";

class TopCard extends Component {
  render() {
    console.log(this.props.value, "topbar");

    console.log(this.props.name, "topBar");

    return (
      <div className={`Dashborad-card border-${this.props.lineColor}`}>
        <div class="Dashborad-card-container  ">
          <div className="Dashborad-card-Name">
            {" "}
            <h5>{this.props.name} </h5>{" "}
          </div>
          <div className="Dashborad-card-Number">
            <h3>{this.props.value}</h3>
          </div>
          <div className="Dashborad-card-Image">
            <i className={this.props.imgName}></i>
          </div>
        </div>
      </div>
    );
  }
}

export default TopCard;
