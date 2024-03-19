import {NextFunction, Request, Response} from "express";
import {loginUser, registerUser} from "../../utility/validators/user";
import {Error} from "../types/error";

export const validateRegisterUser = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    registerUser
        .validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors: Error[]) => {
            next(errors);
        });
};

export const validateLoginUser = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    loginUser
        .validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((errors: Error[]) => {
            next(errors);
        });
};