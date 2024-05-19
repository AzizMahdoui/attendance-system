import { Router } from 'express';
import { DailyDetails } from '../models/dailyDetails.js';
import { DailyStats } from '../models/Stats.js';
import { Schedule } from '../models/schedule.js';
import Shift from '../models/checkInCheckOut.js';

export const sendStats = async (io,socket,formattedDate) => {
  try {
    const startOfDay = new Date(formattedDate);
    const endOfDay = new Date(formattedDate);
    const scheduledShifts = await Schedule.find({ date: formattedDate }).populate('employee');
    if (!scheduledShifts.length) {
      io.to(socket.id).emit('error', 'There is no schedule for this (no Stats)');
      }
      
    const existingStats = await DailyStats.findOne( {date:formattedDate})
      if(!existingStats){
        
        const shifts = await Shift.find({
          date: { $gte: startOfDay, $lt: endOfDay },status: "Schedules"
        }).populate(['employeeId']);

        const dailyStats = new DailyStats({
          date:formattedDate,
          totalEmployees: scheduledShifts.length,
          onTimeEmployees: 0,
          lateEmployees: 0,
          absences: 0,
        });
      scheduledShifts.forEach((scheduledShift) => {
        const attendanceRecord = shifts.find((record) =>  record._id.toString() === scheduledShift.shift.toString());

        if (attendanceRecord) {
          if (attendanceRecord.checkIn!=null) {
            const checkInTime = new Date(attendanceRecord.checkIn);
            const scheduledCheckInTime = new Date(scheduledShift.checkInTime);
           
            if (checkInTime <= scheduledCheckInTime) {
              dailyStats.onTimeEmployees++;
            } else {
              dailyStats.lateEmployees++;
            }
          } 
        } else {
          dailyStats.absences++;
        }
      });
      await dailyStats.save()
      io.to(socket.id).emit('daily_stats', { success: true, data:dailyStats });
    }else{
      existingStats.lateEmployees=0
      existingStats.onTimeEmployees=0
      existingStats.absences = 0
      existingStats.totalEmployees = scheduledShifts.length
        const shifts = await Shift.find({
          date: formattedDate,status: "Direct" 
        }).populate('employeeId');
        scheduledShifts.forEach((scheduledShift) => {
          const attendanceRecord = shifts.find((record) => {
            return record._id.toString() === scheduledShift.shift.toString()});
          if (attendanceRecord) {
            if (attendanceRecord.checkIn!=null) {
              const checkInTime = new Date(attendanceRecord.checkIn);
              const scheduledCheckInTime = new Date(scheduledShift.checkInTime);
             
              if (checkInTime <= scheduledCheckInTime) {
                
                existingStats.onTimeEmployees++;
              } else {
                existingStats.lateEmployees++;
              }
            } 
          } else {
            existingStats.absences++;
          }
        });
        existingStats.totalEmployee = scheduledShifts.length

        await existingStats.save()
        io.to(socket.id).emit('daily_stats', { success: true, data:existingStats });

    }
    
  } catch (err) {
    console.error('Error fetching daily statistics:', err);
    io.to(socket.id).emit('error', 'Server Error');
  }
};
