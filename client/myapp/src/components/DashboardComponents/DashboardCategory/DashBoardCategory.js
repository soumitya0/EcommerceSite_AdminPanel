import React, { Component } from "react";

import "./DashBoardCategory.css";

import TopCard from "../../../common/components/Dashboard/TopCard";
import AddCategory from "./AddCategory/AddCategory";
import CategoryList from "./CategoryList.js/CategoryList";

class DashBoardCategory extends Component {
  render() {
    return (
      <div>
        <h1 className="text-gray text-700">category</h1>
        <p className="marginTop-10">category here</p>
        <div className="GridCardInfo marginTop-20">
          <div>
            <TopCard />
          </div>
          <div>
            <TopCard />
          </div>
          <div>
            <TopCard />
          </div>
        </div>

        <div className="DashBoardCategory_grid">
          <div>
            <AddCategory />
          </div>
          <div>
            <CategoryList />
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoardCategory;
