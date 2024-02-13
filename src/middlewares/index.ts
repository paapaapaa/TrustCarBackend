import {registerUser, loginUser} from "../utility/validators";
import {Request, Response, NextFunction, ErrorRequestHandler} from "express";

export const validateRegisterUser = (req:Request, _res:Response, next:NextFunction) => {
    registerUser.validate(req.body, {abortEarly: false}).then(() => {
        next();
    }).catch((errors) => {
        next(errors);
    });
};

export const validateLoginUser = (req:Request, _res:Response, next:NextFunction) => {
    loginUser.validate(req.body, {abortEarly: false}).then(() => {
        next();
    }).catch((errors) => {
        next(errors);
    });
};

export const ErrorHandler: ErrorRequestHandler = (error, _req, _res, _next) => {

    if(error.name === "ValidationError") {
        return _res.status(403
          ).send(error.errors);
    }
    else if (
      error.type === "required" ||
      error.type === "min" ||
      error.type === "typeError" ||
      error.type === "integer"
    ) {
      return _res.status(403).send(error.errors[0]);
    } else if (
      error.type === "matches" ||
      error.type === "len" ||
      error.type === "optionality"
    ) {
      return _res.status(403).send(error.message);
    } else if (error.code === "P2002") {
      return _res.status(403).send("username already exits");
    }
    return _res.status(400).send("server could not handle the request");
  };