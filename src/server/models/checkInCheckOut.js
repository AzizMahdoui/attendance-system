import mongoose, { Document, Schema, Types } from 'mongoose';



const checkInOutSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  checkIn: { type: Date },
  checkOut: { type: Date },
  status:{
    type:String,
    enum:["Scheduled","Attent"]
  }
});

const Shift = mongoose.models.Shift || mongoose.model('Shift', checkInOutSchema);

export default Shift;
