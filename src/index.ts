import express from "express";
import swaggerUi from "swagger-ui-express"

import { usersRoutes } from "./routes/users.routes";
import swaggerJson from "./swagger.json"

const app = express();

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerJson))

app.use(express.json());

app.use("/users", usersRoutes);

export { app };
