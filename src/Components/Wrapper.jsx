import React, { Component } from "react";
import "../bootstrap.css";
import "../index.css";
import Details from "./Details";
import Preview from "./Preview";
class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.getLocation();
  }
  state = {};
  render() {
    return (
      <div className="container center">
        <Details></Details>
        <Preview></Preview>
      </div>
    );
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      var { latitude, longitude } = position.coords;

      this.location = {
        latitude,
        longitude,
      };
    });
  }
}

export default Wrapper;
