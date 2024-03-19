import express from "express";
import multer from "multer";
import userRouter from "./routers/user-router";
import swaggerUi,{SwaggerUiOptions} from "swagger-ui-express";
import * as swaggerDocument from "./docs/swagger.json";
import { ErrorHandler } from "./middlewares";

const server = express();
const upload = multer();
server.use(express.json());

const swaggerOptions: SwaggerUiOptions = {
    swaggerOptions: {
        url: "/swagger.json",
    },
};

server.get("/api/v1/test-route", (_req, res) => {
    res.send("Hello World!");
});
server.use("/api/v1/user", upload.none(), userRouter);
server.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
server.use(ErrorHandler);

export default server;