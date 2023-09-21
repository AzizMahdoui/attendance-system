import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
      date:{type:String,required:true},
      employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }, 
      shift: { type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }, 
      checkInTime: { type: Date,required:true }, 
      checkOutTime: { type: Date,required:true },
      attendanceStatus:{
        type:String,
        enum:["Late","In-time","Absent"],
        default:"Absent"
      }
})

export const Schedule = mongoose.models.Schedule || mongoose.model("Schedule",scheduleSchema)