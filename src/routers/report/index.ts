import express from "express";
import { RequestHandler } from "express";
import {getReport, getReportStructure, saveReport} from "../../controllers/report";
import { validateGetReportStructure, validateSaveReportStructure } from "../../middleware/validate/report";
import {TokenExtractor} from "../../middleware";
import {validateId} from "../../middleware/validate/generic";


const router = express.Router();


router.post(
    "/get",
    validateId,
    TokenExtractor as RequestHandler,
    getReport as RequestHandler
);

router.post(
    "/save",
    validateSaveReportStructure,
    TokenExtractor as RequestHandler,
    saveReport as RequestHandler
);

router.post(
  "/structure/get",
  validateGetReportStructure,
  TokenExtractor as RequestHandler,
  getReportStructure as RequestHandler
);

export default router;
