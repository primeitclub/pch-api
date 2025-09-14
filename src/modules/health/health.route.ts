import { Router } from "express";
import HealthController from "./health.controller";

const router = Router();
const healthController = new HealthController();

/**   
 * @swagger
 * /api/v1/health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Check the health of the server
 *     responses:
 *       200:
 *         description: Health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: The code of the response
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *                 details:
 *                   type: object
 *                   description: The details of the response
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: The code of the response
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *                 details:
 *                   type: object
 *                   description: The details of the response
 */
router.get("/", healthController.checkHealth);

export default router;