import express from "express";
import testRouter from "./routers/test-router";
import swaggerUi,{SwaggerOptions} from "swagger-ui-express";

const server = express();

server.use("/api/v1/test-route",testRouter);

const swaggerOptions: SwaggerOptions = {
    swaggerOptions: {
      url: "/swagger.json",
    },
  };
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
  server.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, swaggerOptions));

export default server;