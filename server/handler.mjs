import serverless from "serverless-http";
import server from "./server.js";
import dotenv from "dotenv";
dotenv.config();
export const handler = serverless(server);
