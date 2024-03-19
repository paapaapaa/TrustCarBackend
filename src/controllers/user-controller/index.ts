import { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "../../utility/validators/user";
import { hash, genSalt } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import {sign} from "jsonwebtoken";
import { JWT_SECRET } from "../../utility/Config";
import {USER_NOT_FOUND} from "../../messages/user";

const prisma = new PrismaClient();

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, firstname, lastname, organizationId } = registerUser.cast(
    req.body
  );
  try {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        password_salt: salt,
        hashpassword: hashedPassword,
        firstname,
        lastname,
        organization:{
          connect:{
            id: organizationId
          }
        }
      },
    });

    res.status(201).json({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = loginUser.cast(req.body);
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(404).json({
        message: USER_NOT_FOUND,
      });
    }

    const hashedPassword = await hash(password, user!.password_salt);
    const isValid = hashedPassword === user!.hashpassword;

    if (!isValid) {
      res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = sign(
      {
        username: user!.username,
        firstname: user!.firstname,
        lastname: user!.lastname,
      },
      JWT_SECRET!,
    );

    res.status(200).json({
      authToken: token,
    });
  } catch (error) {
    next(error);
  }
};
