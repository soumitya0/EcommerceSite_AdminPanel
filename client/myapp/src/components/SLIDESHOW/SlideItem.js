import React from "react";

import "./SlideItemStyle.css";
function SlideItem(props) {
  return (
    <div className="item-slide">
      <img src={props.imageUrl} />
    </div>
  );
}

export default SlideItem;
