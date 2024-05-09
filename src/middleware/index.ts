import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

export const TokenExtractor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      const decodedToken = verify(
        authorization.replace("Bearer ", ""),
        process.env.JWT_SECRET || "secret"
      ) as { username: string; id: string };
      const username = decodedToken.username;
      const user = await prisma.user.findUnique({
        where: { username },
        include: {
          organization: true,
        },
      });
      if (user) {
        req.params.userId = user.id.toString();
        req.params.organizationId = user.organization_id!.toString();
        req.params.organizationType = user.organization!.type;
        next();
      } else {
        res.status(401).send("token is missing or invalid");
      }
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).send("token is missing or invalid");
  }
};

export const ErrorHandler: ErrorRequestHandler = (error, _req, _res, _next) => {
  console.log(error);

  if (error.name === "ValidationError") {
    return _res.status(403).send(error.errors);
  } else if (
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
