import { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "../../utility/validators";
import { hash, compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, firstname, lastname } = registerUser.cast(
    req.body
  );
  try {
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password_salt: hashedPassword,
        firstname,
        lastname,
      },
    });

    res.status(201).json({
      username: user.username,
      firsntname: user.firstname,
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
        message: "User not found",
      });
    }

    const isValid = await compare(password, user!.password_salt);

    if (!isValid) {
         res.status(401).json({
              message: "Invalid password",
         });
    }

    res.status(200).json({
      message: "User logged in",
    });
  } catch (error) {
    next(error);
  }
};
