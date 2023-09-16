import { Router } from "express"
import { createDailyStatus, listDailyData, updateDailyStatus } from "../controllers/dailyData.controller.js"
const dailyAttendanceRouter = Router()


dailyAttendanceRouter.post("/dailydetails/list",listDailyData)
dailyAttendanceRouter.post("/dailydetails/create",createDailyStatus)
dailyAttendanceRouter.put("/dailydetails/update",updateDailyStatus)



export default dailyAttendanceRouter
