import { NextFunction, Request, Response } from "express";
import { getOrganizationsValidator } from "../../utility/validators/organization";

export const validateGetOrganizations = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    getOrganizationsValidator
        .validate(req.query, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};