import React, { Component } from "react";
import SlidShow from "./SlidShow";

class SlideShowDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listItems: [
        {
          title: "Item 1",
          content: "Break The UI Into A Component Hierarchy",
          imageUrl:
            "https://res.cloudinary.com/dx7a4fyl4/image/upload/v1590630668/2006003_breakfast-store_460_ffinpc.jpg",
        },
        {
          title: "Item 2",
          content: "",
          imageUrl:
            "https://res.cloudinary.com/dx7a4fyl4/image/upload/v1590630619/2006030_apple-reddelicious_460_jnbg1f.jpg",
        },

        {
          title: "Item 4",
          content: "",
          imageUrl:
            "https://res.cloudinary.com/dx7a4fyl4/image/upload/v1590632409/2006002_cooking-essentials_460_siizef.jpg",
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <SlidShow slides={this.state.listItems} />
      </div>
    );
  }
}

export default SlideShowDisplay;
