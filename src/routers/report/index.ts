import express from "express";
import { RequestHandler } from "express";
import { getReport, getReportStructure, saveReport} from "../../controllers/report";
import {
    validateGetReport,
    validateGetReportStructure,
    validateSaveReport,
} from "../../middleware/validate/report";
import {TokenExtractor} from "../../middleware";


const router = express.Router();



/**
 * @openapi
 * /api/v1/report:
 *   get:
 *     tags:
 *       - Report
 *     summary: Get Report
 *     description: Get report with given id
 *     parameters:
 *       - name: registration_number
 *         in: query
 *         description: Registration number of the vehicle.
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *        description: All report with given registration number
 *        content:
 *          application/json:
 *            schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/GetReportResponse'
 */
router.get(
    "/",
    validateGetReport,
    TokenExtractor as RequestHandler,
    getReport as RequestHandler
);



/**
 * @openapi
 * /api/v1/report:
 *   post:
 *     tags:
 *       - Report
 *     summary: Save Report
 *     description: Save report
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveReport'
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Report saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               g$ref: '#/components/schemas/SaveReportResponse'
 */
router.post(
    "/",
    validateSaveReport,
    TokenExtractor as RequestHandler,
    saveReport as RequestHandler
);


/**
 * @openapi
 * /api/v1/report/structure:
 *   get:
 *     tags:
 *       - Report
 *     summary: Report Structure
 *     description: Get report structure
 *     parameters:
 *      - name: Report Properties
 *        in: query
 *        description: Details about report structure
 *        schema:
 *          $ref: '#/components/schemas/ReportStructure'
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      200:
 *       description: Report structure
 *       content:
 *        application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReportStructureResponse'
 */
router.get(
  "/structure",
  validateGetReportStructure,
  TokenExtractor as RequestHandler,
  getReportStructure as RequestHandler
);

export default router;
