// import dotenv from "dotenv";
// dotenv.config();

// // TODO: Define an interface for the Coordinates object
// // https://api.openweathermap.org/data/2.5/weather?q=London&appid=137501ea7b0c14a9b665c7075d583225
// interface Coordinates {
//   lat: number;
//   lon: number;
// }

// // TODO: Define a class for the Weather object
// class Weather {
//   constructor(
//     public city: string,
//     public date: string,
//     public description: string,
//     public icon: string,
//     public temperature: number,
//     public humidity: number,
//     public wind: number,
//     public forecast: Weather[]
//   ) {
//     this.city = city;
//     this.date = date;
//     this.description = description;
//     this.icon = icon;
//     this.temperature = temperature;
//     this.humidity = humidity;
//     this.wind = wind;
//     this.forecast = forecast;
//   }
// }

// // TODO: Complete the WeatherService class
// class WeatherService {
//   // TODO: Define the baseURL, API key, and city name properties
//   constructor(
//     private baseURL: string,
//     private apiKey: string,
//     private city: string
//   ) {
//     this.baseURL = baseURL;
//     this.apiKey = process.env.API_KEY || "";
//     this.city = "";
//   }
//   // TODO: Create fetchLocationData method
//   private async fetchLocationData(query: string) {
//     const response = await fetch(query);
//     return response.json();
//   }
//   // TODO: Create destructureLocationData method
//   // private destructureLocationData(locationData: Coordinates): Coordinates {}
//   // TODO: Create buildGeocodeQuery method
//   // private buildGeocodeQuery(): string {}
//   // TODO: Create buildWeatherQuery method
//   // private buildWeatherQuery(coordinates: Coordinates): string {}
//   // TODO: Create fetchAndDestructureLocationData method
//   // private async fetchAndDestructureLocationData() {}
//   // TODO: Create fetchWeatherData method
//   // private async fetchWeatherData(coordinates: Coordinates) {}
//   // TODO: Build parseCurrentWeather method
//   // private parseCurrentWeather(response: any) {}
//   // TODO: Complete buildForecastArray method
//   // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
//   // TODO: Complete getWeatherForCity method
//   // async getWeatherForCity(city: string) {}
// }

// export default new WeatherService(
//   "https://api.openweathermap.org/data/2.5",
//   process.env.API_KEY || "",
//   "London"
// );
