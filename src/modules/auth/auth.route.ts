import { Router } from "express";
import AuthController from "./auth.controller";
import authenticate from "../../middleware/auth.middleware";

const router = Router();

const authController = new AuthController();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication   
 *     summary: Login to the PCH Service
 *     description: Login to the PCH Service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The user object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The id of the user
 *                     email:
 *                       type: string
 *                       description: The email of the user
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", authController.login);  // here when we use authController.login, this loses the context of the class instance, so we use arrow function to avoid this

// /**
//  * @swagger
//  * /api/v1/auth/me:
//  *   get:
//  *     tags:
//  *       - Authentication
//  *     summary: Get the current user
//  *     description: Get the current user
//  *     responses:
//  *       200:
//  *         description: User authenticated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: string
//  *                   description: The id of the user
//  *                 email:
//  *                   type: string
//  *                   description: The email of the user
//  *                 created_at:
//  *                   type: string
//  *                   description: The created at of the user
//  *                 updated_at:
//  *                   type: string
//  *                   description: The updated at of the user
//  *       401:
//  *         description: Unauthorized
//  *       500:
//  *         description: Internal server error
//  */
// router.get("/me", authenticate, authController.me);
export default router;