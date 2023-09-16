import Shift from "../models/checkInCheckOut.js"
import {DailyDetails} from "../models/dailyDetails.js";

export const checkin = async(req,res)=>{
    
    try {
        const { date, id, status } = await req.body;
        
        const formattedDate = new Date(date).toISOString().split('T')[0];
        const startOfDay = new Date(formattedDate);
        const endOfDay = new Date(formattedDate);
        endOfDay.setDate(endOfDay.getDate() + 1);
    
    
        const employeeDailyStatus = await DailyDetails.findOne({ _id: id, date: { $gte: startOfDay, $lt: endOfDay } }).populate("employeeId")
        if (!employeeDailyStatus) {
          return res.json({ message: 'There is no Employee with this Id or The date of the shift is not set up yet' });
        }
        if(employeeDailyStatus.status==="checked-in"){
          return res.json({success:false, message: 'You have Already checked-in today' });
    
        }
          const checkInShift = new Shift({
            employeeId: employeeDailyStatus.employeeId,
            checkIn: new Date(),
            checkOut: null, 
            status: status,
          });
          
          employeeDailyStatus.status = "checked-in";
          employeeDailyStatus.shiftOfTheDay=checkInShift._id
          await employeeDailyStatus.save()
          await checkInShift.save()
          return res.json({ success: true, data: {employeeDailyStatus}, message: 'Employee have been checked in successfully' });
    
          
        }
       
    
    
       catch (err) {
        return res.json({ message: 'Something Wrong Happened' });
      }
}

export const checkout = async (req,res)=>{

  try {
    const { date,shift_id, id, status } = await req.body
    console.log({ date,shift_id, id, status })
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const startOfDay = new Date(formattedDate);
    const endOfDay = new Date(formattedDate);
    endOfDay.setDate(endOfDay.getDate() + 1);
    const employeeDailyStatus = await DailyDetails.findById(id).populate("employeeId")
    console.log(employeeDailyStatus)

    if (!employeeDailyStatus) {
      return res.json({
        message:
          "There is no Employee with this Id or The date of the shift is not set up yet",
      });
    }

    if (employeeDailyStatus.status==="pending") {

        return res.json({
           success:false, message: "You have to Checkin First",
          });
    
    
    
      }
      const checkOutShift = await Shift.findById(shift_id);

      checkOutShift.checkOut = new Date();
      employeeDailyStatus.status = "checked-out";
      await checkOutShift.save();
      await employeeDailyStatus.save()

   

    return res.json({ success: true, data: {employeeDailyStatus}, message: 'Employee have been checked out successfully' });

  } catch (err) {
    return res.json({ message: "Something went wrong" });
  }
}


export const getShiftsHistory = async (req,res)=>{
  const payload = req.body
  console.log(payload)
  try {
    const shifts = await Shift.find({employeeId:payload.employeeId})
    res.json({success:true,data:shifts,message:"Shifts for this employee Extracted Successfully"})
    
  } catch (err) {
    return res.json({success:false, error: 'Server Error' });
}}


// export const createShift = async(req,res)=>{
//   try{
//       const data =await req.json()    
//       const newShift = new Shift(data)
//       await newShift.save()
//       return res.json({ success: true, data: newShift, message: 'shift Registered Successfully' });

// }catch(err){
//    return res.json({ message: 'An error occurred' });

// }
// }
