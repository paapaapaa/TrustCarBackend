import express from "express";
import multer from "multer";
import userRouter from "./routers/user-router";
import reportRouter from "./routers/report";
import swaggerUi from "swagger-ui-express";
import { ErrorHandler } from "./middleware";
import * as path from "path";
import * as fs from "fs";

const server = express();
const upload = multer();

const swaggerDocument = JSON.parse(fs.readFileSync(path.join('./docs/swagger.json'), 'utf8'));

interface SwaggerDocument {
    [key: string]: any;
}
function loadSwaggerReferences(swaggerDoc: SwaggerDocument, basePath = './docs') {
    if (swaggerDoc.hasOwnProperty('$ref')) {
        const refPath = path.join(basePath, swaggerDoc['$ref']);
        const referencedDoc = JSON.parse(fs.readFileSync(refPath, 'utf8'));
        return loadSwaggerReferences(referencedDoc, path.dirname(refPath));
    }

    Object.keys(swaggerDoc).forEach(key => {
        if (typeof swaggerDoc[key] === 'object' && swaggerDoc[key] !== null) {
            swaggerDoc[key] = loadSwaggerReferences(swaggerDoc[key], basePath);
        }
    });

    return swaggerDoc;
}

const resolvedSwaggerDocument = loadSwaggerReferences(swaggerDocument);
server.use(express.json());

server.use(express.static("public"));
server.use("/api/v1/user", upload.none(), userRouter);
server.use("/api/v1/report", upload.none(), reportRouter);
const swaggerMiddleware = swaggerUi.setup(resolvedSwaggerDocument);
server.use("/api/v1/docs", swaggerUi.serve, swaggerMiddleware);
server.use(ErrorHandler);

export default server;