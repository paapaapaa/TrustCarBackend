import {NextFunction, Request, Response} from "express";
import {
    getReportStructureValidator,
    getReportValidator,
    saveReportValidator,
    populateReportValidator,
} from "../../utility/validators/report";

export const validateGetReportStructure = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    getReportStructureValidator
        .validate(req.query, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};

export const validateSaveReport = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    saveReportValidator
        .validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};

export const validateGetReport = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    getReportValidator
        .validate(req.query, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};

export const validatePopulateReport = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    populateReportValidator
        .validate(req.query, { abortEarly: false})
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });

}