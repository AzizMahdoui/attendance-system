import { Server } from "socket.io";
import { sendDailyData } from "../dailyData.controller.js";
import setupEmployeeChangeStream from "../employeeController.js";
import { setupDailyDataChangeStream } from "../dailyData.controller.js";
export const initializeSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
          origin: "*"
        },
      });
  
    io.on('connection',  (socket) => {
      console.log('A user connected');
      

      setupEmployeeChangeStream(io, socket);
      setupDailyDataChangeStream(io, socket); // Add this line to set up the daily data change stream

      
    
}

)}
