import express from "express";
import { validateLoginUser } from "../../middleware/validate/user";
import { loginController } from "../../controllers/user-controller";
import { RequestHandler } from "express";

const router = express.Router();


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