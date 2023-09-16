import { Employee } from "../models/employee.js";
import qr from "qrcode"
import * as yup from "yup"
import mongoose from "mongoose";
import _ from "lodash"
const employeeSchema = yup.object().shape({
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    lastName: yup.string().required(),
    // phoneNumber: yup.string().required().matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    avatar: yup.string(),
    position: yup.string().required(),
  });
export const list = async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  export const register = async (req, res) => {
    try {
      const employeeData = req.body;
      await employeeSchema.validate(employeeData, { abortEarly: false });

      const existingUser = await Employee.findOne({ employeeId: employeeData.employeeId });
      if (existingUser) {
        return res.json({ message: 'Employee already registered' });
      }
  
      const _id = new mongoose.Types.ObjectId();
  
      const qrCodeData = `${_id}_${employeeData.employeeId}`;
      const qrCodeImageDataURL = await qr.toDataURL(qrCodeData);
  
      const newEmployee = new Employee({
        _id, // Include the generated _id
        ...employeeData,
        qrCode: qrCodeImageDataURL,
      });
  
      await newEmployee.save();
  
      return res.json({ success: true, data: newEmployee, message: 'Employee Registered Successfully' });
    } catch (error) {
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
    };

 export const employeeId = async (req, res, next) => {
    try {
      const { employeeId } = req.params;
        console.log(employeeId)
      const employee = await Employee.findById( employeeId );
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      req.employee = employee;
  
      next(); 
    } catch (error) {
      console.error('Employee ID middleware error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const read=(req,res)=>{
    try{
        const employee = req.employee
        return res.json({success:true,data:employee,message:"Employee has been Extracted Successfully"})
    }catch(err){
        return res.json({success:false,message:"Failed to fetch"})

        }

  }
  
  export const updateEmployee = async (req, res) => {
    try {
      const updateData = req.body;
  
  
      const updatedEmployee = await Employee.findOneAndUpdate(
        { _id: updateData._id }, // Filter by employee ID
        { $set: updateData }, // Update data
        { new: true } // Return the updated document
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      return res.json({ success: true, data: updatedEmployee, message: 'Employee Updated Successfully' });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
  
        return res.status(400).json({ message: 'Validation error', errors: validationErrors });
      }
  
      console.error('Update employee error:', error);
      return res.status(500).json({ message: 'An error occurred' });
    }
  };
  export const deleteEmployee = async (req, res) => {
    try {
      const { employeeId } = req.body; // Assuming you get the employee ID from the route parameters
  
      const deletedEmployee = await Employee.findOneAndDelete({ _id: employeeId });
  
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      return res.json({ success: true, data: deletedEmployee, message: 'Employee Deleted Successfully' });
    } catch (error) {
      console.error('Delete employee error:', error);
      return res.status(500).json({ message: 'An error occurred' });
    }
  };


export const sendEmployeeList = async (io, socket) => {
  try {
    const employees = await Employee.find();
    socket.emit('employee_list', employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    socket.emit('error', 'Server Error');
  }
};

export const setupEmployeeChangeStream = (io, socket) => {
  const watchStream = Employee.watch();

  watchStream.on('change', async (change) => {
    if (change.operationType === "insert" || change.operationType === "update" || change.operationType === "delete") {
      await sendEmployeeList(io, socket);
    }
  });

  sendEmployeeList(io, socket);
};

export default setupEmployeeChangeStream;