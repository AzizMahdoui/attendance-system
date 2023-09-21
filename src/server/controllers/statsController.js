import { Router } from 'express';
import { DailyDetails } from '../models/dailyDetails.js';
import { DailyStats } from '../models/Stats.js';
import { Schedule } from '../models/schedule.js';

export const sendStats = async (req, res) => {
  try {
    const { date } = req.body;
    const formattedDate = new Date(date).toISOString().split("T")[0];
    const startOfDay = new Date(formattedDate);
    const endOfDay = new Date(formattedDate);
    endOfDay.setDate(endOfDay.getDate() + 1);

    // Find all scheduled shifts for the specified date
    const scheduledShifts = await Schedule.find({ date: formattedDate }).populate('employee');

    if (!scheduledShifts.length) {
      return res.json({ message: "There is no schedule for this day", success: false });
    }

    // Find all check-in/check-out records for the specified date
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
      const attendanceRecord = existingAttendance.find((record) => record.employeeId._id.toString() === shift.employee._id.toString());

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

    // Create or update the dailyStats record
    // const statsRecord = await DailyStats.findOneAndUpdate(
    //   { day: formattedDate },
    //   dailyStats,
    //   { upsert: true, new: true }
    // );

    return res.json({ success: true, data: dailyStats });
  } catch (err) {
    console.error('Error fetching daily statistics:', err);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
};
export const setUpDailyStatsStream = (io,socket)=>{
    io.on('fetch_daily_data',async (date)=>{
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const startOfDay = new Date(formattedDate);
      const endOfDay = new Date(formattedDate);
    })
}