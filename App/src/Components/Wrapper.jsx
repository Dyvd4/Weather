import React, { Component } from "react";
import "../bootstrap.css";
import "../index.css";
import Details from "./Details";
import Preview from "./Preview";
import LoadingCircle from './LoadingCircle';
import moment from 'moment';
class Wrapper extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.componentIsMounted = true;
    this.getCoords();
    setInterval(this.getWeatherData, 500);
    setInterval(this.getGeolocation, 500);
  }
  state = {
    data: {
      weather: {},
      apiCallUnit: "metric"
    },
    selectedDay: moment().format("DD:MM:YYYY"),
    gotCoords: false,
    gotWeatherData: false
  };
  loadCurrentTab = (currentForecast) => {
    let oldData = this.state.data;
    oldData.weather.data.current = currentForecast;
    let selectedDay = moment.unix(currentForecast.dt).format("DD:MM:YYYY");
    this.setState({
      data: oldData,
      selectedDay
    });
  }
  switchTemperatureUnit = (unit) => {
    let oldData = this.state.data;
    oldData.apiCallUnit = unit;
    this.setState({
      data: oldData
    });
    this.getWeatherData();
  }
  render() {
    if (this.state.gotWeatherData) {
      return (
        <div className="container center">
          <Details onClick={this.switchTemperatureUnit} data={this.state.data}></Details>
          <Preview onClick={this.loadCurrentTab} data={this.state.data} selectedDay={this.state.selectedDay}></Preview>
        </div>
      );
    }
    return (
      <div className="container center">
        <LoadingCircle size="50px" borderWidth="10px"></LoadingCircle>
      </div>
    );
  }
  getCoords = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      var { latitude, longitude } = position.coords;

      this.state.data.location = {
        latitude,
        longitude,
      };
      this.setState({ gotCoords: true });
    });
  };
  getGeolocation = async () => {
    if (this.state.gotCoords == true) {
      const key = process.env.REACT_APP_GoogleApiKey;
      var lat = this.state.data.location.latitude;
      var lon = this.state.data.location.longitude;
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`);
      const data = await response.json();

      clearInterval(this.getGeolocation);
    }

  }
  getWeatherData = async () => {
    if (this.state.gotCoords == true) {
      var lat = this.state.data.location.latitude;
      var lon = this.state.data.location.longitude;
      const key = process.env.REACT_APP_WeatherApiKey;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${this.state.data.apiCallUnit}&lang=de&appid=${key}`);
      const data = await response.json();

      let oldData = this.state.data;
      oldData.weather.data= data;
      this.setState({
        data: oldData,
        gotWeatherData: true
      });
      clearInterval(this.getWeatherData);
    }
  };
}

export default Wrapper;