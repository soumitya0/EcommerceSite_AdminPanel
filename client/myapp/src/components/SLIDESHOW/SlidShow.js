import React, { Component } from "react";
import SlideItem from "./SlideItem";

class SlidShow extends Component {
  constructor(props) {
    console.log("constructor");
    super(props);
    this.state = {
      slideshow: this.props.slides,
      slideIndex: 0,
    };
    this.currentIndex = 0;
    this.pause = false;
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT");
    var that = this;
    this.timeout = setTimeout(function () {
      that.goTo("auto");
    }, 3000);
  }

  componentDidUpdate() {
    console.log("COMPONENT DID UPDATE");

    var that = this;
    if (this.pause === true) {
      clearInterval(this.timeout);
      this.timePause = setTimeout(function () {
        clearInterval(this.timePause);
      }, 8000);
      this.pause = false;
    }
    this.timeout = setTimeout(function () {
      that.goTo("auto");
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  goTo = (direction) => {
    let index = 0;
    switch (direction) {
      case "auto":
        index = this.currentIndex + 1;
        this.currentIndex = index >= this.props.slides.length ? 0 : index;
        break;

      default:
        this.currentIndex = direction;
        this.pause = true;
        break;
    }
    console.log("pause:", this.pause);
    this.setState({
      slideIndex: this.currentIndex,
      slideshow: this.props.slides[this.currentIndex],
    });
  };

  render() {
    console.log(this.props.slide);
    return (
      <div className="slideshow-simple">
        <SlideItem
          title={this.state.slideshow.title}
          content={this.state.slideshow.content}
          imageUrl={this.state.slideshow.imageUrl}
        />
      </div>
    );
  }
}

export default SlidShow;
