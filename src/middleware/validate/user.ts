import {NextFunction, Request, Response} from "express";
import {loginUser, registerUser} from "../../utility/validators/user";

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
        .catch((errors) => {
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
        .catch((errors) => {
            next(errors);
        });
};