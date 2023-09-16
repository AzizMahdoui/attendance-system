import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
      employee: { type: Schema.Types.ObjectId, ref: 'Employee' }, // Reference to the Employee model
      shift: { type: Schema.Types.ObjectId, ref: 'Shift' }, // Reference to the Shift model
      checkInTime: { type: Date }, // Check-in time for the employee
      checkOutTime: { type: Date },
      attendanceStatus:{
        type:String,
        enum:["late","in-time","absent"],
        default:"absent"
      }
})

export const Schedule = mongoose.models.Schedule || mongoose.model("Schedule",scheduleSchema)