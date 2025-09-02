import { Router } from "express";
import HistoryController from "./history.controller";
import authenticate from "../../middleware/auth.middleware";

const router = Router();
const historyController = new HistoryController();

/**   
 * @swagger
 * /api/v1/history:
 *   post:
 *     tags:
 *       - History
 *     summary: Create a new history
 *     description: Create a new history
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the history
 *               description:
 *                 type: string
 *                 description: The description of the history
 *               starting_year:
 *                 type: number
 *                 description: The starting year of the history
 *               ending_year:
 *                 type: number
 *                 description: The ending year of the history
 *             required:
 *               - title
 *               - description
 *               - starting_year
 *               - ending_year
 *     responses:
 *       201:
 *         description: History created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *                 data:
 *                   type: object
 *                   description: The data of the response
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The id of the history
 *                     title:
 *                       type: string
 *                       description: The title of the history
 *                     description:
 *                       type: string
 *                       description: The description of the history
 *                     starting_year:
 *                       type: number
 *                       description: The starting year of the history
 *                     ending_year:
 *                       type: number
 *                       description: The ending year of the history
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, historyController.createHistory);



/**
 * @swagger
 * /api/v1/history:
 *   get:
 *     tags:
 *       - History
 *     summary: Get all history
 *     responses:
 *       200:
 *         description: History fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *                 data:
 *                   type: array    
 *                   description: The data of the response                   
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The id of the history
 *                       title:
 *                         type: string
 *                         description: The title of the history
 *                       description:
 *                         type: string
 *                       starting_year:
 *                         type: number
 *                         description: The starting year of the history
 *                       ending_year:
 *                         type: number
 *                         description: The ending year of the history
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get("/", historyController.getHistory);




/**
 * @swagger
 * /api/v1/history/{id}:
 *   put:
 *     tags:
 *       - History
 *     summary: Update a history
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the history
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the history
 *               description:
 *                 type: string
 *                 description: The description of the history
 *               starting_year:
 *                 type: number
 *                 description: The starting year of the history
 *               ending_year:
 *                 type: number
 *                 description: The ending year of the history
 *             required:
 *               - title
 *               - description
 *               - starting_year
 *               - ending_year
 *     responses:
 *       200:
 *         description: History updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string   
 *                   description: The message of the response
 *                 data:
 *                   type: object
 *                   description: The data of the response
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The id of the history
 *                     title:
 *                       type: string
 *                       description: The title of the history
 *                     description:
 *                       type: string
 *                       description: The description of the history
 *                     starting_year:
 *                       type: number
 *                       description: The starting year of the history
 *                     ending_year:
 *                       type: number
 *                       description: The ending year of the history
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.put("/:id", authenticate, historyController.updateHistory);

/**
 * @swagger
 * /api/v1/history/{id}:
 *   delete:
 *     tags:
 *       - History
 *     summary: Delete a history
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the history
 *     responses:
 *       200:
 *         description: History deleted successfully
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticate, historyController.deleteHistory);

export default router;