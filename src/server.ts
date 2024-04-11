import express from "express";
import multer from "multer";
import userRouter from "./routers/user-router";
import reportRouter from "./routers/report";
import { ErrorHandler } from "./middleware";
import swaggerDocs from "./swagger";
import { PORT } from "./utility/Config";
import https from "https";


const server = express();
const upload = multer();

const options: https.ServerOptions = {
    key: process.env.KEY,
    cert: process.env.CERT
};


server.use(express.json());

server.use(express.static("public"));
server.get("/api/v1/test-route", (_req, res) => {
    res.send("Hello World!");
});

server.use("/api/v1/user", upload.none(), userRouter);
server.use("/api/v1/report", upload.none(), reportRouter);

swaggerDocs(server, PORT.toString());

server.use(ErrorHandler);

export const httpsServer = https.createServer(options, server);

export default server;