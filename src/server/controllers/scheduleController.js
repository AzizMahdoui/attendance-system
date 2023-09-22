import Shift from "../models/checkInCheckOut.js";
import { Schedule } from "../models/schedule.js";
import * as yup from "yup"
// import { Router } from "express";
const scheduleSchema = yup.object().shape({
    checkInTime:yup.date().required(),
    checkOutTime:yup.date().required(),
    employee:yup.string().required()})
export const CreateSchedule = async(req,res)=>{
        
        try{
                const {date,checkInTime,checkOutTime,employee} = req.body
                await scheduleSchema.validate({checkInTime,checkOutTime,employee})
                const SchedueledShift = new Schedule({date,employee,checkInTime,checkOutTime})
                const newShift = new Shift({
                  employeeId: employee._id,
                  checkIn: checkInTime,
                  checkOut: checkOutTime,
                  status:"Scheduled"
                });
                SchedueledShift.shift = newShift._id
                await SchedueledShift.save()
                res.json({success:true,data:SchedueledShift,message:"A shift Scheduled for this Employee Successfully"})
              }catch (error) {
            if (error instanceof yup.ValidationError) {
              const validationErrors = {};
              error.inner.forEach((err) => {
                validationErrors[err.path] = err.message;
              });
        
              return res.status(400).json({ message: 'Validation error', errors: validationErrors });
            }
        
            console.error('User registration error:', error);
        
            return res.status(500).json({ message: 'An error occurred' });
          }
} 
