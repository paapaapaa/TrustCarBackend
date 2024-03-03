import express from "express";
import { RequestHandler } from "express";
import { getReportStructure, saveReport } from "../../controllers/report";
import { validateGetReportStructure, TokenExtractor, validateSaveReportStructure } from "../../middlewares";


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
