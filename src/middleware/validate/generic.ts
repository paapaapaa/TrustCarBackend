import {NextFunction, Request, Response} from "express";
import {getIdStructure} from "../../utility/validators/generic";

export const validateId = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    getIdStructure
        .validate(req.query, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors) => {
            next(errors);
        });
};