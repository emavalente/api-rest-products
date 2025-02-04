import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DB_URL, {
  models: [__dirname + "/../models/**/*"],
  logging: false, // detiene los logs de Sequelize
});

export default db;
