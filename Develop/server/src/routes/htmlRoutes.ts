// SG:
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router, Request, Response } from "express";
// SG: In the current context, import.meta.url is pointing to the URL of the htmlRoutes.ts module file
// SG: This URL can then be converted to a file path using fileURLToPath(import.meta.url), which results in: c:\Users\TBD\bootcamp\09-Servers-and-APIs\02-Challenge\Develop\server\src\routes\htmlRoutes.ts
// SG: path.dirname() method returns the directory name of the path
// SG: __dirname is a global object that stores the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

export default router;
