import express from "express";
import { RequestHandler } from "express";
import { getReportStructure, saveReport } from "../../controllers/report";
import { validateGetReportStructure, validateSaveReportStructure } from "../../middleware/validate/report";
import {TokenExtractor} from "../../middleware";


const router = express.Router();

router.get(
  "/structure",
  validateGetReportStructure,
  TokenExtractor as RequestHandler,
  getReportStructure as RequestHandler
);

router.post(
  "/",
  validateSaveReportStructure,
  TokenExtractor as RequestHandler,
  saveReport as RequestHandler
);

export default router;
