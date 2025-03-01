import dotenv from "dotenv";
import express from "express";
dotenv.config();

// Import the routes
import routes from "./routes/index.js";
// import { get } from "node:http";

const app = express();

const PORT = process.env.PORT || 3001;

// const apiBaseUrl = process.env.API_BASE_URL;
// const apiKey = process.env.API_KEY;

// TODO: Serve static files of entire client dist folder
app.use(express.static("../client/dist"));

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
