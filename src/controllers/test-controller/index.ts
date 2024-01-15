import { Request, Response } from "express";

export const testController = (_req: Request, res: Response): void => {
     console.log("testController");
     res.send("Hello World!");
};