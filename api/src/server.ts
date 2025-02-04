import express from "express";
import db from "./config/db";
import router from "./routes/productsRoutes";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import SwaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const server = express();

// Enabled CORS connections.
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

server.use(cors(corsOptions));

// Database connection
export const dbConnect = async () => {
  try {
    await db.authenticate();
    db.sync(); // agrego sync(force) para rehacer la sincronización por si la tabla tiene cambios.
    console.log(colors.magenta.bold("<< Successful DATABASE connection >>"));
  } catch (error) {
    console.log(colors.bgRed.white.bold("DATABASE Connection Error"));
  }
};

dbConnect();

// Json reading enablement
server.use(express.json());

// Morgan enablement
server.use(morgan("dev"));

// Main Routes definitions
server.use("/api/products", router);

// Swagger enablement
server.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
export default server;
