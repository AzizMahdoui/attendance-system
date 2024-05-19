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
import { ScheduleRouter } from "./routers/scheduleRouter.js";
import StatsRouter from "./routers/StatsRouter.js";
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const corsOptions = {
//   origin: "http://127.0.0.1:5173", 
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, 
//   optionsSuccessStatus: 204, 
// };

app.use(cors());
app.use("/", employeeRouter);
app.use("/", dailyAttendanceRouter);
app.use("/", shiftRouter);
app.use("/",ScheduleRouter)
app.use("/",StatsRouter)

initializeSocketIO(server)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
