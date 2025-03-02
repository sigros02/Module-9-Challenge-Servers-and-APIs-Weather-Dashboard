import dotenv from "dotenv";
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
  async executeWeatherQuery(coordinates: Coordinates) {
    const response = await fetch(
      `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lat}&appid=${this.apiKey}&units=imperial&cnt=6`
    );
    const weather = await response.json();
    return weather;
  }
  async fetchAndDestructureWeatherData(
    cityName: string,
    coordinates: Coordinates
  ) {
    let weatherData = await this.executeWeatherQuery(coordinates);
    weatherData.list.map((listArrayEntry: any) => {
      listArrayEntry.city = cityName;
    });
    let destructuredWeatherData = weatherData.list.map(this.parseWeatherData);
    return destructuredWeatherData;
  }
  parseWeatherData(reading: any) {
    return new Weather(
      reading.city,
      reading.dt_txt,
      reading.weather[0].description,
      reading.main.humidity,
      reading.weather[0].icon,
      reading.main.temp,
      reading.wind.speed
    );
  }
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
}

export default new WeatherService();
