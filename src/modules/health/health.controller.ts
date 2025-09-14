import { HttpError } from "../../lib";
import { Request, Response } from "express";
import HealthService from "./health.service";

class HealthController {
      checkHealth = async (req: Request, res: Response) => {
            try {
                  await HealthService.checkHealth();
                  res.json({ message: "Health check passed" });
            } catch (error) {
                  if (error instanceof HttpError) {
                        res.status(error.status).json({ code: error.status, message: error.message, details: error.details });
                  } else {
                        res.status(500).json({ code: 500, message: "Internal server error" });
                  }
            }
      }
}



export default HealthController;