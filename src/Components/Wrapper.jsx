import React, { Component } from "react";
import "../bootstrap.css";
import "../index.css";
import Details from './Details';
import Preview from './Preview';
class Wrapper extends Component {
 
  state = {};
  render() {
    return(
    <div className="container center">
      <Details></Details>
      <Preview></Preview>
    </div>);
  }
}

export default Wrapper;
