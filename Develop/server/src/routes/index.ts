// SG: imports the Router object from the express module
import { Router } from "express";

// SG: creates a new instance of an Express router
// SG: router object is used to define and organize the routes for the application
const router = Router();

import apiRoutes from "./api/index.js";
import htmlRoutes from "./htmlRoutes.js";

// SG: use method attaches the imported route modules (apiRoutes and htmlRoutes) to the router object
router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

// SG: exports router object so it can be imported into the server.js file
export default router;
