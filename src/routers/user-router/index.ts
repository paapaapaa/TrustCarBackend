import express from "express";
import { validateLoginUser, validateRegisterUser } from "../../middleware/validate/user";
import { loginController, registerController } from "../../controllers/user-controller";
import { RequestHandler } from "express";

const router = express.Router();


/**
 * @openapi
 * /api/v1/user/register:
 *   post:
 *     tags:
 *       - Create User
 *     summary: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 */


router.post("/register", validateRegisterUser, registerController as RequestHandler);

  /**
   * @openapi
   * /api/v1/user/login:
   *  post:
   *   tags:
   *     - Authenticate
   *   summary: Login a user
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           $ref: '#/components/schemas/LoginUser'
   *   responses:
   *    '200':
   *     description: User logged in successfully
   *     content:
   *      application/json:
   *        schema:
   *         type: object
   *         properties:
   *          authToken:
   *            type: string
   */
router.post("/login", validateLoginUser, loginController as RequestHandler);

export default router;