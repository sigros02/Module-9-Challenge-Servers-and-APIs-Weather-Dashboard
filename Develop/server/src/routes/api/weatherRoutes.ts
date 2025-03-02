import { Router, type Request, type Response } from "express";
const router = Router();
const SEARCH_HISTORY_FILE_NAME = "storage.json";
import fs from "fs";

// import HistoryService from '../../service/historyService.js';
import WeatherService from "../../service/weatherService.js";

router.post("/", async (req: Request, res: Response) => {
  try {
    const { cityName } = req.body;
    const coordinates = await WeatherService.getCityLocationData(cityName);
    const weather = await WeatherService.fetchAndDestructureWeatherData(
      cityName,
      coordinates
    );
    res.json(weather);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  saveCityToHistory(req.body.cityName);
});

router.get("/history", async (_req: Request, res: Response) => {
  let cityHistory = getCurrentCityHistory();
  let response = cityHistory.cities.map(formatCity);
  res.send(response);
});

router.delete("/history/:city", async (req: Request, res: Response) => {
  let cityHistory = getCurrentCityHistory();
  let cityIndex = cityHistory.cities.findIndex(
    (city) => city === req.params.city
  );
  if (cityIndex !== -1) {
    cityHistory.cities.splice(cityIndex, 1);
    fs.writeFileSync(SEARCH_HISTORY_FILE_NAME, JSON.stringify(cityHistory));
  }
  let response = cityHistory.cities.map(formatCity);
  res.send(response);
});

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
