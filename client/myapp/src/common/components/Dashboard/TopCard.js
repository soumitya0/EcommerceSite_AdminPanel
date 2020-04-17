import React, { Component, Fragment } from "react";

class TopCard extends Component {
  render() {
    return (
      <div className="Dashborad-card border-left-primary ">
        <div class="Dashborad-card-container  ">
          <div className="Dashborad-card-Name">
            {" "}
            <h5>PRODUCT COUNT </h5>{" "}
          </div>
          <div className="Dashborad-card-Number">
            <h3>5021</h3>
          </div>
          <div className="Dashborad-card-Image">
            <i className="fas fa-warehouse cardImg"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default TopCard;
