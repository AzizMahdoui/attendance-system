import { Router } from 'express';
import { DailyDetails } from '../models/dailyDetails.js';
import { DailyStats } from '../models/Stats.js';
import { Schedule } from '../models/schedule.js';

export const sendStats = async (io,socket,formattedDate) => {
  try {
    const startOfDay = new Date(formattedDate);
    const endOfDay = new Date(formattedDate);

    const scheduledShifts = await Schedule.find({ date: formattedDate }).populate('employee');

    if (!scheduledShifts.length) {
    io.to(socket.id).emit('error', 'There is no schedule for this');
    }

    const existingAttendance = await DailyDetails.find({
      date: { $gte: startOfDay, $lt: endOfDay },
    }).populate('employeeId');

    const dailyStats = new DailyStats({
      totalEmployees: scheduledShifts.length,
      onTimeEmployees: 0,
      lateEmployees: 0,
      absences: 0,
    });

    scheduledShifts.forEach((shift) => {
      const attendanceRecord = existingAttendance.find((record) => record.shiftOfTheDay.toString() === shift.shift.toString());

      if (attendanceRecord) {
        if (attendanceRecord.status === 'checked-in') {
          const checkInTime = new Date(attendanceRecord.checkInTime);
          const scheduledCheckInTime = new Date(shift.checkInTime);

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


    io.to(socket.id).emit('daily_stats', { success: true, data:dailyStats });
  } catch (err) {
    console.error('Error fetching daily statistics:', err);
    io.to(socket.id).emit('error', 'Server Error');
  }
};
