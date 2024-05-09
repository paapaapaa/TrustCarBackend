import express, { RequestHandler } from "express";
import { validateGetOrganizations } from "../../middleware/validate/organization";
import { getOrganizations } from "../../controllers/organization";
import { TokenExtractor } from "../../middleware";

const router = express.Router();

/**
 * @openapi
 * /api/v1/organization:
 *   get:
 *     tags:
 *       - Orgnization
 *     summary: Get list of organizations
 *     description: Get list of organizations based on the type
 *     parameters:
 *       - name: type
 *         in: query
 *         description: type of organization needed to fetched.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *        description: List of orgnizations
 *        content:
 *          application/json:
 *            schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/Organization'
 */
router.get(
  "/",
  validateGetOrganizations,
  TokenExtractor as RequestHandler,
  getOrganizations as RequestHandler
);

export default router;
