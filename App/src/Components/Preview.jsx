import React, { Component } from "react";
import "../bootstrap.css";
import WeatherIcon from './WeatherIcon';
import "../Preview.css";
import moment from 'moment';
import 'moment/locale/de';

class Preview extends Component {
  render() {
    moment.locale("de");
    const { daily } = this.props.data.weather.data;
    if (daily.length === 8) {
      daily.splice(daily.length - 1, 1);
    }
    return (
      <div className="preview-wrapper">
        {daily.map((forecast, index) => {
        let currentDay  = moment.unix(forecast.dt).format("DD:MM:YYYY");
           
          return (
            <div onClick={() => this.props.onClick(forecast)} key={index} className={(this.props.selectedDay === currentDay) ? "day-card active" : "day-card"}>
              <div className="day-card-group-1">
                <div className="text-secondary">{moment.unix(forecast.dt).format("dd.")}</div>
                <WeatherIcon
                  status={forecast.weather[0].main}
                  size="lg"
                />
              </div>
              <div className="day-card-group-2">
                <span style={{ margin: "0.2em" }}>{Math.round(forecast.temp.max)}°</span>
                <span className="text-secondary">{Math.round(forecast.temp.min)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Preview;
