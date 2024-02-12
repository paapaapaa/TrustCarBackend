import { Request, Response } from "express";
import { hash } from "bcrypt";
import { PrismaClient } from '@prisma/client';
import {Email, Password, Username} from "../../types/parameters";
const prisma = new PrismaClient();


interface AuthParams {
     username: Username;
     password: Password;
}

interface RegisterParams {
     username: Username;
     email: Email;
     password: Password;
}

async function getUsers() {
     return prisma.user.findMany();
}

export const authController = async (req: Request, res: Response): Promise<void> => {
     const { username, password }: AuthParams = req.body;

     try {
          const hashedPassword = await hash(password, 10);
          const users = await getUsers();

          console.log(`Username: ${username}, Hashed Password: ${hashedPassword}, Users: ${users}`);

          res.send("User registered successfully!");
     } catch (error) {
          console.error("Error hashing password", error);
          res.status(500).send("Error: Authentication failed");
     }
};

export const registerController = async (req: Request, res: Response): Promise<void> => {
     const { username, email, password }: RequestDefinition = req.body;

     try {
          const hashedPassword = await hash(password, 10);
          const users = await getUsers();

          console.log(`Username: ${username}, Hashed Password: ${hashedPassword}, Users: ${users}`);

          res.send("User registered successfully!");
     } catch (error) {
          console.error("Error hashing password", error);
          res.status(500).send("Error: Authentication failed");
     }
};