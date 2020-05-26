import React, { Component, Fragment } from "react";

import "./CategoryViewStyle.css";

class CategoryView extends Component {
  render() {
    return (
      <Fragment>
        <div className="CategoryGrid">
          <div className="CategoryView-img">
            <div className="CategoryViewImage">
              <img
                className="CategoryImg"
                src={
                  process.env.PUBLIC_URL + `/uploads/image-1588961030836.jpg`
                }
              />
            </div>
          </div>

          <div className="CategoryView-name">
            <p className="CategoryView-nameText">Grocery & Staples</p>
          </div>
          <div className="CategoryView-ItemCount">
            <p className="CategoryView-ItemCountText">
              {" "}
              505 <span>item</span>
            </p>
          </div>
        </div>
        <h1>SOUMITY</h1>
      </Fragment>
    );
  }
}

export default CategoryView;
