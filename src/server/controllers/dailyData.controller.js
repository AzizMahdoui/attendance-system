import {DailyDetails} from "../models/dailyDetails.js"
import { Employee } from "../models/employee.js";
import Shift from "../models/checkInCheckOut.js"
import * as yup from 'yup';
import { sendStats } from "./statsController.js";
import { Schedule } from "../models/schedule.js";

const updateSchema = yup.object().shape({
  id: yup.string().required('ID is required.'),
  checkinTime: yup.date().required('Checkin time is required.'),
  checkoutTime: yup.date().required('Checkout time is required.'),
});
const createDailyStatusSchema = yup.object().shape({
  employees: yup.array().of(yup.string().required('Employee ID is required.')),
  date: yup.date().required('Date is required.'),
});
const listDailyDataSchema = yup.object().shape({
  date: yup.date().required('Date is required.'),
});

export const listDailyData = async (req,res)=>{
  await listDailyDataSchema.validate(req.body, { abortEarly: false });

    const { date } = await req.body;
    console.log("received data",date)

    const formattedDate = new Date(date).toISOString().split("T")[0];


  const startOfDay = new Date(formattedDate);
  const endOfDay = new Date(formattedDate);
  endOfDay.setDate(endOfDay.getDate() + 1);
  try {
        const existingAttendance = await DailyDetails.find({
          date: { $gte: startOfDay, $lt: endOfDay }
        }).populate(['employeeId','shiftOfTheDay']);

    if (existingAttendance.length === 0) {
          const employees = await Employee.find().select(['_id', "firstName", "lastName", "avatar"]);


          if(!employees){
            return res.json({ success: false, message: 'There are no employees' });
          }
          const defaultAttendances = await Promise.all(employees.map(async (employee, index) => {
            
            const dailyData = new DailyDetails({
              employeeId: employee._id,
              date: new Date(formattedDate),
              status: 'pending',
              shiftOfTheDay:null
            });
            await dailyData.save();
            return dailyData.populate('employeeId');
          }));
        
          return res.json({ success: true, data: defaultAttendances, message: 'No data available yet for this day' });
    }
    return res.json({ success: true, data: existingAttendance });
  }  catch (err) {
    if (err instanceof yup.ValidationError) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      return res.status(400).json({ success: false, message: 'Validation error', errors: validationErrors });
    }

    console.error('Error creating daily status:', err);
    return res.status(500).json({ success: false, message: 'An error occurred' });
  }
}
export const createDailyStatus = async (req,res)=>{
      await createDailyStatusSchema.validate(req.body, { abortEarly: false });

        const {employees,date} = req.body

        const formattedDate = new Date(date).toISOString()
        try{
            const defaultAttendances = await Promise.all(employees.map(async (employee, index) => {
              const newShift = new Shift({
                employeeId:employee,
                checkIn:null,
                checkOut:null,
              })
              const dailyData = new DailyDetails({
                employeeId: employee,
                date: new Date(formattedDate),
                status: 'pending',
                shiftOfTheDay:newShift._id
              });
              await newShift.save()
              await dailyData.save();
              return dailyData.populate(['employeeId',"shiftOfTheDay"]);
            }));
            return res.json({ success: true, data: defaultAttendances, message: 'a dailyInstance Created Successfully' });

        } catch (err) {
          if (err instanceof yup.ValidationError) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            return res.status(400).json({ success: false, message: 'Validation error', errors: validationErrors });
          }
      
          console.error('Error creating daily status:', err);
          return res.status(500).json({ success: false, message: 'An error occurred' });
        }
      }

export const updateDailyStatus = async (req, res) => {
  try {
    const { id, checkinTime, checkoutTime } = req.body;

    await updateSchema.validate(req.body, { abortEarly: false });

    const dailyStatusToUpdate = await DailyDetails.findById(id).populate("shiftOfTheDay");

    if (!dailyStatusToUpdate) {
           return res.status(404).json({ success: false, message: 'Daily status not found.' });
    }

          const shiftToUpdate = await Shift.findById(dailyStatusToUpdate.shiftOfTheDay._id);
          shiftToUpdate.checkIn = checkinTime;
          shiftToUpdate.checkOut = checkoutTime;
        
        return res.json({ dailyStatusToUpdate, shiftToUpdate });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      return res.status(400).json({ success: false, message: 'Validation error', errors: validationErrors });
    }

    return res.status(500).json({ success: false, message: 'An error occurred.' });
  }
};


export const sendDailyData = async (io, socket, formattedDate) => {
  try {
    const startOfDay = new Date(formattedDate);
    const endOfDay = new Date(formattedDate);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const existingAttendance = await DailyDetails.find({
      date: { $gte: startOfDay, $lt: endOfDay },
    }).populate(['employeeId', 'shiftOfTheDay']);

    if (existingAttendance.length === 0) {
      const employees = await Employee.find().select(['_id', "firstName", "lastName", "avatar"]);

      if (!employees) {
        io.to(socket.id).emit('error', 'You got no Employees');
      }

      const defaultAttendances = await Promise.all(employees.map(async (employee, index) => {
        
        const dailyData = new DailyDetails({
          employeeId: employee._id,
          date: new Date(formattedDate),
          status: 'pending',
          shiftOfTheDay: null,
        });

        await dailyData.save();

        return dailyData.populate('employeeId');
      }));
      console.log(formattedDate)
      io.to(socket.id).emit('daily_data', { success: true, data: defaultAttendances });
    } else {
      io.to(socket.id).emit('daily_data', { success: true, data: existingAttendance });
    }

    

  } catch (err) {
    console.error('Error fetching daily data:', err);
    io.to(socket.id).emit('error', 'Server Error');
  }
};

// export const sendDailyDataUpdate = async (io, socket, startOfDay, endOfDay) => {
//   try {
//     // Fetch and emit the updated data
//     const updatedAttendance = await DailyDetails.find({
//       date: { $gte: startOfDay, $lt: endOfDay },
//     }).populate(['employeeId', 'shiftOfTheDay']);

//     io.to(socket.id).emit('daily_data', { success: true, data: updatedAttendance });
//   } catch (err) {
//     console.error('Error fetching updated daily data:', err);
//     io.to(socket.id).emit('error', 'Server Error');
//   }
// };

export const setupDailyDataChangeStream = (io, socket) => {
  socket.on('fetch_daily_data', async (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    const startOfDay = new Date(formattedDate);
    const endOfDay = new Date(formattedDate);
    endOfDay.setDate(endOfDay.getDate() + 1);
    sendDailyData(io, socket, formattedDate);
    sendStats(io,socket,formattedDate)
    const changeStream = DailyDetails.watch();
    const statsChangeStream = Schedule.watch()
    changeStream.on('change', async (change) => {
      if (change.operationType === "insert" || change.operationType === "update" || change.operationType === "delete") {
       
        sendDailyData(io, socket, formattedDate);
        sendStats(io,socket,formattedDate)

      }
    });
    statsChangeStream.on('change', async (change) => {
      if (change.operationType === "insert" || change.operationType === "update" || change.operationType === "delete") {
       
        sendStats(io,socket,formattedDate)

      }
    });
  });
};


