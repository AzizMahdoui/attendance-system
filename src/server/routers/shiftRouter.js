import { Router } from "express";
import { checkin, checkout, getShiftsHistory } from "../controllers/Shift.controller.js";



const shiftRouter = Router()

shiftRouter.post("/shift/checkin",checkin)
shiftRouter.post("/shift/checkout",checkout)
shiftRouter.post("/shifts/history",getShiftsHistory)


export default shiftRouter