import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getOrganizationsValidator } from "../../utility/validators/organization";

const prisma = new PrismaClient();

export const getOrganizations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type } = getOrganizationsValidator.cast(req.query);
  try {
    const organizations = await prisma.organization.findMany({
      where: {
        type,
      },
    });

    res.status(200).json({ organizations });
  } catch (error) {
    next(error);
  }
};
