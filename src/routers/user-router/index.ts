import express from "express";
import { authController, registerController } from "../../controllers/user-controller";

const router = express.Router();

router.post("/authenticate", authController);
router.post("/register", authController);

export default router;