import server from "./server";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(colors.cyan.bold(`Server is running on port: ${port}`)));
