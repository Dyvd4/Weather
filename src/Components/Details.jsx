import moment from 'moment';
import 'moment/locale/de';
import { Component } from "react";
import { Line } from "react-chartjs-2";
import "../bootstrap.css";
import "../Details.css";
import "../index.css";
import LoadingCircle from './LoadingCircle';
import WeatherIcon from './WeatherIcon';
class Details extends Component {

  getLineChartData(hourlyData, currentDate) {
    let filteredData = [];
    let counter = 0;
    let currentHourlyDate;
    for (let i = 0; i < hourlyData.length; i++) {
      currentHourlyDate = moment.unix(hourlyData[i].dt).format("DD:MM:YYYY");
      if (counter === 3) {
        counter = 0;
      }
      if (counter === 0 && currentHourlyDate === currentDate) {
        filteredData.push(hourlyData[i]);
      }
      counter++;
    }
    return {
      datasets: [{
        data: filteredData.map(entity => { return Math.round(entity.temp) }),
        backgroundColor: 'rgba(255, 204, 0, 0.2)',
        borderColor: '#ffbb00',
        pointStyle: 'circle',
        pointBackgroundColor: '#ffbb00'
      }],
      labels: filteredData.map(entity => { return moment.unix(entity.dt).format("HH:mm") }),
    }
  }
  getLineChartOptions() {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: '#ffffff'
          }
        }]
      },

      tooltips: {
        bodyAlign: 'center',
        custom: tooltipItem => {
          tooltipItem.displayColors = false;
        },
        callbacks: {
          title: () => { return }
        }
      }
    }
  }
  renderLineChart(chartData, chartOptions) {

    if (chartData.datasets[0].data.length !== 0) {
      return (
        <Line
          options={chartOptions}
          data={chartData}
        />);
    }
    else {
      return (
        <div>
          <h5 style={{ textAlign: "center", marginTop: "1em" }}>No data available</h5>
          <LoadingCircle
            size="50px"
            borderWidth="10px"
          />
        </div>

      );
    }
  }
  render() {
    const { current, hourly } = this.props.data.weather.data;
    let currentDate = moment.unix(current.dt).format("DD:MM:YYYY");
    let chartData = this.getLineChartData(hourly, currentDate);
    let chartOptions = this.getLineChartOptions();
    let unitIsCelsius = this.props.data.apiCallUnit === "metric";
    moment.locale('de');
    return (
      <div className="details-wrapper">
        <div>
          <div style={{ display: "inline", float: "left" }}>
            <div className="info-group-1">
              <div className="info-group-item" id="main">
                <div style={{ margin: "0 0.25em 0 0" }}>
                  <WeatherIcon
                    status={current.weather[0].main}
                    size="lg"
                  />
                </div>
                <span id="currentTemperature">{(!current.temp.day) ? Math.round(current.temp) : Math.round(current.temp.day)}</span>
              </div>

              <div className="info-group-item" id="config">
                <span onClick={() => this.props.onClick("metric")} className={(unitIsCelsius) ? "temperatureConfig-item" : "temperatureConfig-item text-secondary"}>°C</span>
                <span className="temperatureConfig-item">|</span>
                <span onClick={() => this.props.onClick("imperial")} className={(unitIsCelsius) ? "temperatureConfig-item text-secondary" : "temperatureConfig-item"}>°F</span>
              </div>

              <div className="info-group-item" id="secondary">
                <span className="text-secondary">Niederschlag: {current.clouds}%</span>
                <span className="text-secondary">Luftfeuchte: {current.humidity}%</span>
                <span className="text-secondary">Wind: {current.wind_speed} km/h</span>
              </div>
            </div>
          </div>
          <div style={{ display: "inline", float: "right" }}>
            <div className="info-group-2" id="third">
              <h3>No city available</h3>
              <h5 className="text-secondary">{moment.unix(current.dt).format("dddd")}</h5>
              <h5 className="text-secondary">{current.weather[0].description}</h5>
            </div>
          </div>
        </div>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {this.renderLineChart(chartData, chartOptions)}
        </div>
      </div>
    );
  }
}

export default Details;
