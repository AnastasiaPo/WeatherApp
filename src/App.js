import React, { Component } from "react";
import "./App.css";
// import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

// const [value, setValue] = useState();

const PLACES = [
  { name: "Москва", zip: "105005" },
  { name: "Санкт-Петербург", zip: "187015" },
  { name: "Сочи", zip: "354000" },
  { name: "Пятигорск", zip: "357361" }
]


// <AddressSuggestions token="c082b2b71d8e1ccaecd64b666ca6bab4bf2dae32" value={value} onChange={setValue} />

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }

  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading...</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";

    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

class App extends Component {

  constructor() {
   super();
   this.state = {
     activePlace: 0,
   };
 }

  render() {
    const activePlace = this.state.activePlace;

    return (
      <div className="weather-body">
        {PLACES.map((place, index) => (
          <button
            className="city-btn"
            key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
          >
            {place.name}
          </button>
        ))}
        <WeatherDisplay
          key={activePlace}
          zip={PLACES[activePlace].zip}
           />
      </div>
    );
  }
}

export default App;
