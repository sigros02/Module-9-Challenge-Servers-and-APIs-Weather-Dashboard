import { Router, type Request, type Response } from "express";
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post("/api/weather/", (_req: Request, _res: Response) => {
  // // TODO: GET weather data from city name
  // const weatherService = new WeatherService();
  // const weatherData = weatherService.fetchWeatherData();
  // TODO: save city to search history
});

// TODO: GET search history
router.get("/history", async (_req: Request, _res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete("/history/:id", async (_req: Request, _res: Response) => {});

export default router;
