import {sendStats} from "../controllers/statsController.js"
import { Router } from "express"

const StatsRouter = Router()

StatsRouter.get("/stats",sendStats)
export default StatsRouter
