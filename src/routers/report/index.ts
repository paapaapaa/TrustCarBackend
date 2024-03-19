import express from "express";
import { RequestHandler } from "express";
import {getReport, getReportStructure, saveReport} from "../../controllers/report";
import {
    validateGetReport,
    validateGetReportStructure,
    validateSaveReport,
} from "../../middleware/validate/report";
import {TokenExtractor} from "../../middleware";


const router = express.Router();


router.get(
    "/",
    validateGetReport,
    TokenExtractor as RequestHandler,
    getReport as RequestHandler
);

router.post(
    "/",
    validateSaveReport,
    TokenExtractor as RequestHandler,
    saveReport as RequestHandler
);

router.get(
  "/structure",
  validateGetReportStructure,
  TokenExtractor as RequestHandler,
  getReportStructure as RequestHandler
);

export default router;
