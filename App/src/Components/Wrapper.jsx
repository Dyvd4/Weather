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
    this.getCoords();
    setInterval(this.getWeatherData, 500);
    setInterval(this.getGeolocation,500);
  }
  state = {
    data: {},
    gotCoords: false,
  };
  render() {
    return (
      <div className="container center">
        <Details data={this.state.data}></Details>
        <Preview data={this.state.data}></Preview>
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
    if(this.state.gotCoords == true){
      const key = process.env.REACT_APP_GoogleApiKey;
      var lat = this.state.data.location.latitude;
      var lon = this.state.data.location.longitude;
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`);
      const data =await response.json();

      this.setState({gotCoords:false});
      clearInterval(this.getGeolocation);
    }
   
  }
  getWeatherData = async () => {
    if (this.state.gotCoords == true) {
      var lat = this.state.data.location.latitude;
      var lon = this.state.data.location.longitude;
      const key = process.env.REACT_APP_WeatherApiKey;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=de&appid=${key}`);
      const data = await response.json();

      this.state.data.weather = {
        data,
      };

      this.setState({ gotCoords: false });
      clearInterval(this.getWeatherData);
    }
  };
}

export default Wrapper;
