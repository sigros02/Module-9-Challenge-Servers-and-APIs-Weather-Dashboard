import dotenv from "dotenv";
import moment from "moment";
// import { exec } from "node:child_process";
dotenv.config();

// https://api.openweathermap.org/data/2.5/weather?q=London&appid=137501ea7b0c14a9b665c7075d583225
class Coordinates {
  lat: number;
  lon: number;

  constructor(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
  }
}
// city, date, icon, iconDescription, tempF, windSpeed, humidity
// city, date, description, humidity, icon, temperature, wind
class Weather {
  constructor(
    public city: string,
    public date: string,
    public description: string,
    public humidity: number,
    public icon: string,
    public temperature: number,
    public wind: number
  ) {
    this.city = city;
    this.date = date;
    this.description = description;
    this.icon = icon;
    this.temperature = temperature;
    this.humidity = humidity;
    this.wind = wind;
  }
}

class WeatherService {
  private baseURL?: string;
  private apiKey?: string;
  private cityName?: string;
  constructor() {
    this.baseURL = process.env.API_BASE_URL || "";
    this.apiKey = process.env.API_KEY || "";
    this.cityName = "";
  }

  async getCityLocationData(cityName: string) {
    let cityLocation = await this.executeCoordinatesQuery(cityName);
    return new Coordinates(cityLocation.lat, cityLocation.lon);
  }

  // SG: https://openweathermap.org/api/geocoding-api
  async executeCoordinatesQuery(cityName: string) {
    this.cityName = cityName;
    const response = await fetch(
      `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`
    );
    const coordinates = await response.json();
    // SG: allow user to select from available cities
    return coordinates[0];
  }

  async executeCurrentWeatherQuery(coordinates: Coordinates) {
    let response = await fetch(
      `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lat}&appid=${this.apiKey}&units=imperial`
    );
    const currentWeather = await response.json();
    return currentWeather;
  }

  async executeWeatherForecastQuery(coordinates: Coordinates) {
    let response = await fetch(
      `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lat}&appid=${this.apiKey}&units=imperial&cnt=40`
    );
    let weatherForecast = await response.json();
    weatherForecast.list = weatherForecast.list.filter(
      (_reading: any, index: number) => index % 8 === 0
    );
    return weatherForecast;
  }

  async fetchAndDestructureWeatherData(
    cityName: string,
    coordinates: Coordinates
  ) {
    let currentWeatherData = await this.executeCurrentWeatherQuery(coordinates);
    let weatherForecastData = await this.executeWeatherForecastQuery(
      coordinates
    );
    currentWeatherData.city = cityName;
    // SG: add city name to each list entry
    weatherForecastData.list.map((listArrayEntry: any) => {
      listArrayEntry.city = cityName;
    });
    currentWeatherData = this.parseWeatherData(currentWeatherData);
    currentWeatherData.date = new Date().toLocaleDateString();
    weatherForecastData = weatherForecastData.list.map(this.parseWeatherData);
    const weatherData = [currentWeatherData, ...weatherForecastData];
    // console.log("*************************************************");
    // console.log(weatherData);
    return weatherData;
  }

  parseWeatherData(reading: any) {
    return new Weather(
      reading.city,
      moment(reading.dt_txt).format("l"),
      reading.weather[0].description,
      reading.main.humidity,
      reading.weather[0].icon,
      reading.main.temp,
      reading.wind.speed
    );
  }
}

export default new WeatherService();
