import {NextFunction, Request, Response} from "express";
import {getReportStructure, saveReportStructure} from "../../utility/validators/report";

export const validateGetReportStructure = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    getReportStructure
        .validate(req.query, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};

export const validateSaveReportStructure = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    saveReportStructure
        .validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};