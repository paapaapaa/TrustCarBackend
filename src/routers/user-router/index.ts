import express from "express";
import { validateRegisterUser, validateLoginUser } from "../../middlewares";
import { loginController, registerController } from "../../controllers/user-controller";
import { RequestHandler } from "express";

const router = express.Router();

router.post("/register", validateRegisterUser, registerController as RequestHandler);
router.post("/login", validateLoginUser, loginController as RequestHandler);

export default router;