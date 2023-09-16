    
import mongoose from 'mongoose';
import * as dotenv from "dotenv"
const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect("mongodb+srv://aziz:aziz@cluster0.lwhexbv.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 30, // Use maxPoolSize instead of poolSize
      })
      console.log("DB has Been Connected")
      

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
}

export default dbConnect;
