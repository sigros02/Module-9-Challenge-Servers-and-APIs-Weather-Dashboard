import { Router, type Request, type Response } from "express";
const router = Router();
const SEARCH_HISTORY_FILE_NAME = "storage.json";
import fs from "fs";

// import HistoryService from '../../service/historyService.js';
import WeatherService from "../../service/weatherService.js";

// TODO: POST Request with city name to retrieve weather data
router.post("/", async (req: Request, res: Response) => {
  // TODO: GET weather data from city name

  // https://api.openweathermap.org/data/2.5/weather?q=London&appid=137501ea7b0c14a9b665c7075d583225
  try {
    const { cityName } = req.body;
    const coordinates = await WeatherService.getCityLocationData(cityName);
    console.log("************************************");
    const weather = await WeatherService.fetchAndDestructureWeatherData(
      coordinates
    );
    console.log("++++++++++++++++++++++++++++++++++++");
    res.json(weather);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // TODO: save city to search history
  saveCityToHistory(req.body.cityName);
});
// https://api.openweathermap.org/data/2.5/weather?q=London&appid=137501ea7b0c14a9b665c7075d583225
// TODO: save city to search history

// TODO: GET search history
router.get("/history", async (_req: Request, res: Response) => {
  let cityHistory = getCurrentCityHistory();
  let response = cityHistory.cities.map(formatCity);
  console.log(response);
  res.send(response);
});

// * BONUS TODO: DELETE city from search history
router.delete("/history/:id", async (_req: Request, _res: Response) => {});

function formatCity(cityName: string) {
  return { name: cityName };
}

function getCurrentCityHistory() {
  let cityHistory = {
    cities: [] as string[],
  };
  if (fs.existsSync(SEARCH_HISTORY_FILE_NAME)) {
    cityHistory = JSON.parse(
      fs.readFileSync(SEARCH_HISTORY_FILE_NAME).toString()
    );
  }
  return cityHistory;
}

function saveCityToHistory(cityName: string) {
  let cityHistory = getCurrentCityHistory();
  // TODO: if city exists, move to beginning of search history
  let duplicateCityIndex = cityHistory.cities.findIndex(
    (city) => city === cityName
  );
  if (duplicateCityIndex !== -1) {
    cityHistory.cities.splice(duplicateCityIndex, 1);
    cityHistory.cities.unshift(cityName);
  } else {
    cityHistory.cities.unshift(cityName);
  }
  fs.writeFileSync(SEARCH_HISTORY_FILE_NAME, JSON.stringify(cityHistory));
}

export default router;
