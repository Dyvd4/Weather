import moment from 'moment';
import { Component } from "react";
import "../bootstrap.css";
import "../index.css";
import Details from "./Details";
import LoadingCircle from './LoadingCircle';
import Preview from "./Preview";
class Wrapper extends Component {
  componentDidMount = () => {
    this.fetchCords();
  }
  state = {
    loading: true,
    data: {
      weather: {},
      apiCallUnit: "metric"
    },
    selectedDay: moment().format("DD:MM:YYYY")
  };
  fetchCords = () => {
    this.setState({ loading: true }, () => {
      navigator.geolocation.getCurrentPosition((position) => {
        let { latitude, longitude } = position.coords;
        this.setState({
          data: {
            ...this.state.data,
            location: {
              latitude,
              longitude,
            }
          }
        }, () => {
          this.fetchWeatherData();
        });
      });
    });
  };
  fetchWeatherData = async () => {
    var lat = this.state.data.location.latitude;
    var lon = this.state.data.location.longitude;
    const key = process.env.REACT_APP_WeatherApiKey;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${this.state.data.apiCallUnit}&lang=de&appid=${key}`);
    const data = await response.json();
    let oldData = this.state.data;
    oldData.weather.data = data;
    this.setState({ data: oldData, loading: false });
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
      data: oldData,
      selectedDay: moment().format("DD:MM:YYYY")
    });
    this.fetchWeatherData();
  }
  render() {
    if (!this.state.loading) {
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
}

export default Wrapper;