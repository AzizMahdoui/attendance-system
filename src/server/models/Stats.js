import mongoose from "mongoose";

const dailyStatsSchema = new mongoose.Schema({
        totalEmployee: {
            type:Number,
            default:0,
        },
        onTimeEmployees: { type: Number, default: 0 }, 
        lateEmployees: { type: Number, default: 0 },
        absences: { type: Number, default: 0 },
        date:{
           type:Date
        },
        schedule:{
            type:mongoose.Types.ObjectId,
            ref:"Schedule"
        }
})

export const DailyStats = mongoose.models.DailyStats||mongoose.model("DailyStats",dailyStatsSchema)