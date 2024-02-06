import express from "express";
import multer from 'multer';
import authRouter from "./routers/auth-router";
import swaggerUi,{SwaggerUiOptions} from "swagger-ui-express";
import * as swaggerDocument from "./docs/swagger.json";

const server = express();
const upload = multer();
server.use(express.json());

const swaggerOptions: SwaggerUiOptions = {
    swaggerOptions: {
        url: "/swagger.json",
    },
};

server.use("/api/v1/authenticate", upload.none(), authRouter);
server.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

export default server;