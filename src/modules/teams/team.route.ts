import { Router } from "express";
import authenticate from "../../middleware/auth.middleware";
import TeamController from "./team.controller";
import { upload, handleUpload, fileErrorHandler } from "../../middleware/upload.middleware";

const teamController = new TeamController();
const router = Router();

/**   
 * @swagger
 * /api/v1/teams:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Create a new team
 *     description: Create a new team with a file upload for the team's image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the team
 *               starting_year:
 *                 type: number
 *                 description: The starting year of the team
 *               ending_year:
 *                 type: number
 *                 description: The ending year of the team
 *               github_url:
 *                 type: string
 *                 description: The GitHub URL of the team
 *               linkedin_url:
 *                 type: string
 *                 description: The LinkedIn URL of the team
 *               instagram_url:
 *                 type: string
 *                 description: The Instagram URL of the team
 *               is_lead:
 *                 type: boolean
 *                 description: Whether the team is the lead
 *               designation:
 *                 type: string
 *                 description: The designation of the team
 *               role:
 *                 type: string
 *                 description: The role of the team
 *               img_url:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the team (uploaded as multipart/form-data)
 *             required:
 *               - name
 *               - starting_year
 *               - ending_year
 *               - designation
 *               - img_url
 *     responses:
 *       201:
 *         description: Team created successfully
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
 *                       description: The id of the team
 *                     name:
 *                       type: string
 *                       description: The name of the team
 *                     starting_year:
 *                       type: number
 *                       description: The starting year of the team
 *                     ending_year:
 *                       type: number
 *                       description: The ending year of the team
 *                     github_url:
 *                       type: string
 *                       description: The GitHub URL of the team
 *                     linkedin_url:
 *                       type: string
 *                       description: The LinkedIn URL of the team
 *                     instagram_url:
 *                       type: string
 *                       description: The Instagram URL of the team
 *                     is_lead:
 *                       type: boolean
 *                       description: Whether the team is the lead
 *                     designation:
 *                       type: string
 *                       description: The designation of the team
 *                     role:
 *                       type: string
 *                       description: The role of the team
 *                     img_url:
 *                       type: string
 *                       description: The image URL of the team (URL of the uploaded image)
 */
router.post("/", authenticate, upload.single('img_url'), fileErrorHandler, handleUpload, teamController.createTeam);

/**   
 * @swagger
 * /api/v1/teams/{id}:
 *   put:
 *     tags:
 *       - Teams
 *     summary: Update a team
 *     description: Update a team with a file upload for the team's image
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the team
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the team
 *               starting_year:
 *                 type: number
 *                 description: The starting year of the team
 *               ending_year:
 *                 type: number
 *                 description: The ending year of the team
 *               github_url:
 *                 type: string
 *                 description: The GitHub URL of the team
 *               linkedin_url:
 *                 type: string
 *                 description: The LinkedIn URL of the team
 *               instagram_url:
 *                 type: string
 *                 description: The Instagram URL of the team
 *               is_lead:
 *                 type: boolean
 *                 description: Whether the team is the lead
 *               designation:
 *                 type: string
 *                 description: The designation of the team
 *               role:
 *                 type: string
 *                 description: The role of the team
 *               img_url:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the team (uploaded as multipart/form-data)
 *     responses:
 *       200:
 *         description: Team updated successfully
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
 *                       description: The id of the team
 *                     name:
 *                       type: string
 *                       description: The name of the team
 *                     starting_year:
 *                       type: number
 *                       description: The starting year of the team
 *                     ending_year:
 *                       type: number
 *                       description: The ending year of the team
 *                     github_url:
 *                       type: string
 *                       description: The GitHub URL of the team
 *                     linkedin_url:
 *                       type: string
 *                       description: The LinkedIn URL of the team
 *                     instagram_url:
 *                       type: string
 *                       description: The Instagram URL of the team
 *                     is_lead:
 *                       type: boolean
 *                       description: Whether the team is the lead
 *                     designation:
 *                       type: string
 *                       description: The designation of the team
 *                     role:
 *                       type: string
 *                       description: The role of the team
 *                     img_url:
 *                       type: string
 *                       description: The image URL of the team
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authenticate, upload.single('img_url'), handleUpload, teamController.updateTeam);

/**   
 * @swagger
 * /api/v1/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     summary: Delete a team
 *     description: Delete a team
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the team
 *     responses:
 *       200:
 *         description: Team deleted successfully
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
router.delete("/:id", authenticate, teamController.deleteTeam);

/**   
 * @swagger
 * /api/v1/teams/get-by-year:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Get a team by year
 *     description: Get a team by year
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               starting_year:
 *                 type: number
 *                 description: The starting year of the team
 *               ending_year:
 *                 type: number
 *                 description: The ending year of the team
 *             required:
 *               - starting_year
 *               - ending_year
 *     responses:
 *       200:
 *         description: Team by year fetched successfully
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
 *                         description: The id of the team
 *                       name:
 *                         type: string
 *                         description: The name of the team
 *                       starting_year:
 *                         type: number
 *                         description: The starting year of the team
 *                       ending_year:
 *                         type: number
 *                         description: The ending year of the team
 *                     github_url:
 *                       type: string
 *                       description: The GitHub URL of the team
 *                     linkedin_url:
 *                       type: string
 *                       description: The LinkedIn URL of the team
 *                     instagram_url:
 *                       type: string
 *                       description: The Instagram URL of the team
 *                     is_lead:
 *                       type: boolean
 *                       description: The is lead of the team
 *                     designation:
 *                       type: string
 *                       description: The designation of the team
 *                     role:
 *                       type: string
 *                       description: The role of the team
 *                     img_url:
 *                       type: string
 *                       description: The image URL of the team
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/get-by-year", authenticate, teamController.getTeamByYear);

export default router;
