import express from "express";
import multer from "multer";
import userRouter from "./routers/user-router";
import reportRouter from "./routers/report";
import swaggerUi,{SwaggerUiOptions} from "swagger-ui-express";
import * as swaggerDocument from "./docs/swagger.json";
import { ErrorHandler } from "./middleware";

const server = express();
const upload = multer();
server.use(express.json());

const swaggerOptions: SwaggerUiOptions = {
    swaggerOptions: {
        url: "/swagger.json",
    },
};

server.use(express.static("public"));
server.use("/api/v1/user", upload.none(), userRouter);
server.use("/api/v1/report", upload.none(), reportRouter);
server.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
server.use(ErrorHandler);

export default server;