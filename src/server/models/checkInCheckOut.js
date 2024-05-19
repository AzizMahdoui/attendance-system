import mongoose, { Document, Schema, Types } from 'mongoose';



const checkInOutSchema = new Schema({
  date:{type:Date},
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  checkIn: { type: Date },
  checkOut: { type: Date },
  status:{
    type:String,
    enum:["Scheduled","Direct","Attent","Done"]
  }
});

const Shift = mongoose.models.Shift || mongoose.model('Shift', checkInOutSchema);

export default Shift;
