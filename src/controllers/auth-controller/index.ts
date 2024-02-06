import { Request, Response } from "express";
import { hash } from "bcrypt";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


interface RequestDefinition {
     username: string;
     password: string;
}

async function getUsers() {
     return prisma.user.findMany();
}
export const authController = async (req: Request, res: Response): Promise<void> => {
     const { username, password }: RequestDefinition = req.body;

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