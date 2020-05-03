import React, { Component } from "react";

import "./DashBoardCategory.css";

import TopCard from "../../../common/components/Dashboard/TopCard";
import AddCategory from "./AddCategory/AddCategory";
import CategoryList from "./CategoryList.js/CategoryList";

const DashBoardCategory = () => {
  var length;

  const getLength = (val) => {
    console.log(val, "DashBoard category");

    length = val;
  };

  console.log(length, "Length");

  return (
    <div>
      <h1 className="text-gray text-700">category</h1>
      <p className="marginTop-10">category here</p>
      <div className="GridCardInfo marginTop-20">
        <div>
          <TopCard Name="CATEGORY COUNT" />
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
          <CategoryList sendData={getLength} />
        </div>
      </div>
    </div>
  );
};

export default DashBoardCategory;
