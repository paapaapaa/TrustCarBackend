import express from "express";
import testRouter from "./routers/test-router";
const swaggerUi = require('swagger-ui-express');

const server = express();

server.use("/api/v1/test-route",testRouter);

export default server;