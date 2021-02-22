import React, { Component } from "react";
import "../bootstrap.css";
import "../index.css";
import { Line } from "react-chartjs-2";
import "../Details.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloudSun, faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faCloud, faCloudSun);

class Details extends Component {
  state = {};

  render() {
//  const weatherData= this.props.weather.data;
 // const locationData = this.props.location;
    return (
      <div className="details-wrapper">
        <div>
          <div style={{ display: "inline", float: "left" }}>
            <div className="info-group-1">
              <div className="info-group-item" id="main">
                <FontAwesomeIcon
                  style={{ margin: "0 0.25em" }}
                  icon="cloud"
                  size="sm"
                />
                <span id="currentTemperature">  </span>
              </div>

              <div className="info-group-item" id="config">
                <span className="temperatureConfig-item">°C</span>
                <span className="temperatureConfig-item">|</span>
                <span className="temperatureConfig-item">°F</span>
              </div>

              <div className="info-group-item" id="secondary">
                <span className="text-secondary">Niederschlag: 0%</span>
                <span className="text-secondary">Luftfeuchte: 62%</span>
                <span className="text-secondary">Wind: 30 km/h</span>
              </div>
            </div>
          </div>
          <div style={{ display: "inline", float: "right" }}>
            <div className="info-group-2" id="third">
              <h3>Backnang</h3>
              <h5 className="text-secondary">Donnerstag</h5>
              <h5 className="text-secondary"></h5>
            </div>
          </div>
        </div>
        <div>
          <Line
            width={100}
            height={100}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    );
  }
}

export default Details;
