import React, { Component, useState } from "react";

import "./DashBoardCategory.css";

import TopCard from "../../../common/components/Dashboard/TopCard";
import AddCategory from "./AddCategory/AddCategory";
import CategoryList from "./CategoryList.js/CategoryList";

const DashBoardCategory = () => {
  const [length, setLength] = useState(0);

  // var length;

  const getLength = (val) => {
    console.log(val, "DashBoard category");

    // length = val;

    setLength(val);
  };

  console.log("Length", length);
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
