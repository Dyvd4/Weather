import React, { Component } from "react";
import "../bootstrap.css";
import "../index.css";
import Details from "./Details";
import Preview from "./Preview";
class Wrapper extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getLocation();
    setInterval(this.getWeatherData, 500);
  }
  state = {
    gotLocationData: false,
  };
  render() {
    return (
      <div className="container center">
        <Details></Details>
        <Preview></Preview>
      </div>
    );
  }
  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      var { latitude, longitude } = position.coords;

      this.state.location = {
        latitude,
        longitude,
      };
      this.setState({ gotLocationData: true });
    });
  };
  getWeatherData = async () => {
    if (this.state.gotLocationData == true) {
      let { latitude, longitude } = this.state.location;
      const key = process.env.WeatherApiKey;
      const link = `pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${key}`;
      const data= await fetch(link);
      this.state.weather = {
        data: await data.json(),
      };
    }
  };
}

export default Wrapper;
