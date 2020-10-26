import React, { Component } from "react";
import "./App.css";
import DadataSuggestions from 'react-dadata-suggestions';
import "react-dadata-suggestions/dist/styles.css";

const dadataToken = '9357f46cef73bd355912567b08e7ecd06f531745';

const PLACES = [
  { name: "Москва", zip: "105005" },
  { name: "Санкт-Петербург", zip: "187015" },
  { name: "Сочи", zip: "354000" },
  { name: "Пятигорск", zip: "357361" }
]

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const geoname = this.props.onSelect;
    //const zip = this.props.zip;
    const URL = "api.openweathermap.org/data/2.5/weather?id=" + geoname + "&appid=2fe9657dc864de269a18a030c1815838";
    // const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
    //   zip +
    //   "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
    console.log('вот тут должен быть объект с подсказками ' + geoname)
  }

  render() {
    const weatherData = this.state.weatherData;

    if (!weatherData) return <div>Загрузка...</div>;
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

// constructor(props) {
//   super(props)
//   this.state = {
//     suggestion: []
//   }
// }
constructor() {
   super();
   this.state = {
     activePlace: 0,
     onSelect: ''
   }
 }

 updateData = (value) => {
    this.setState({ onSelect: value })
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
        <DadataSuggestions
          className="dadata-body"
          token={ dadataToken }
          //onSelect={(suggestion) => this.props.update(suggestion.data.geoname_id)}
          updateData={this.updateData}
          onSelect={ (suggestion) => this.onSelect.updateData(suggestion.data.geoname_id) }
          //onClick={() => { this.props.updateData(this.state.onSelect)}}
        />
        <WeatherDisplay
          key={activePlace}
          zip={PLACES[activePlace].zip}
          onSelect={this.state.onSelect}
           />
      </div>
    );
  }
}

export default App;
