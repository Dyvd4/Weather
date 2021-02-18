import React, { Component } from "react";
import "../bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Preview.css";
class Preview extends Component {
  state = {};
  render() {
    return (
      <div className="preview-wrapper">
        <div className="day-card">
          <div className="day-card-group-1">
            <div className="text-secondary">Do.</div>
            <FontAwesomeIcon icon="cloud" size="lg"/>
          </div>
          <div className="day-card-group-2">
            <span>12°</span>
            <span className="text-secondary">4°</span>
          </div>
        </div>
        <div className="day-card">
          <div className="day-card-group-1">
            <div className="text-secondary">Do.</div>
            <FontAwesomeIcon icon="cloud" size="lg"/>
          </div>
          <div className="day-card-group-2">
            <span>12°</span>
            <span className="text-secondary">4°</span>
          </div>
        </div>
        <div className="day-card">
          <div className="day-card-group-1">
            <div className="text-secondary">Do.</div>
            <FontAwesomeIcon icon="cloud" size="lg"/>
          </div>
          <div className="day-card-group-2">
            <span>12°</span>
            <span className="text-secondary">4°</span>
          </div>
        </div>
        <div className="day-card">
          <div className="day-card-group-1">
            <div className="text-secondary">Do.</div>
            <FontAwesomeIcon icon="cloud" size="lg"/>
          </div>
          <div className="day-card-group-2">
            <span>12°</span>
            <span className="text-secondary">4°</span>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Preview;
