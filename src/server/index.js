import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dbConnect from "../exports/db/connect.js";
import employeeRouter from "./routers/employee.router.js";
import { Server } from "socket.io"; // Import Server from socket.io
import http from "http";
import dailyAttendanceRouter from "./routers/dailyData.router.js";
import shiftRouter from "./routers/shiftRouter.js";
import { initializeSocketIO } from "./controllers/socketController/socketServices.js";

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://127.0.0.1:5173", // Replace with your React app's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (if needed)
  optionsSuccessStatus: 204, // Set the response status for preflight requests to 204
};

app.use(cors(corsOptions));
app.use("/", employeeRouter);
app.use("/", dailyAttendanceRouter);
app.use("/", shiftRouter);
initializeSocketIO(server)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
