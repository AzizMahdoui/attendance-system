import mongoose, { Document, Schema, Types } from 'mongoose';
import Shift from './checkInCheckOut.js';



// Create the mongoose schema
const dailyDetailsSchema = Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  shiftOfTheDay: { type: Schema.Types.ObjectId, ref: 'Shift', required: false },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'checked-in', 'checked-out'], default: 'pending' },
});

export const DailyDetails = mongoose.models.DailyDetails || mongoose.model('DailyDetails', dailyDetailsSchema);

