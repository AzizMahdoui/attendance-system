import { CreateSchedule } from "../controllers/scheduleController.js";
import { Router } from "express";

export const ScheduleRouter = Router()

ScheduleRouter.post("/schedule",CreateSchedule)