import AttendanceModal from "../../components/Attendance/Attendance";
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import './dashboard.css';
import Stats from "./stats/Stats";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [dailyData, setDailyData] = useState([]);
  const [checkInModal, setCheckInModal] = useState(false);
  const [checkOutModal, setCheckOutModal] = useState(false);
  const [dayToCheck, setDayToCheck] = useState("");
  const [employeeToVerify, setEmployeeToVerify] = useState("");
  const [shiftId, setShiftId] = useState("");
  useEffect(() => {
   
    const socket = socketIOClient("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit("fetch_daily_data", date);
    });

    socket.on("daily_data", (data) => {
      setDailyData(data.data);
    });

    socket.on("error", (errorMessage) => {
      console.error("Server Error:", errorMessage);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });


    return () => {
      socket.disconnect();
    };
  }, [date]);

  const handleChange = (e) => {
    setDate(new Date(e.target.value));
    console.log(date)
  };

 
const dailyStats = {
   
    totalEmployees: 30,
    onTimeEmployees: 18,
    lateEmployees: 7,
    absences:15, 
    
}
  return (
    <div className="dashboard">
      <Stats date={date} dailyStats ={dailyStats}></Stats>
      <div className="dashboard-layout">
        <input onChange={handleChange} type="date" value={date.toISOString().split("T")[0]} />
        <button>Submit</button>
      </div>
      <div className="dailydata">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {dailyData ? dailyData.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.employeeId?.firstName}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td className={entry.status === "pending" ? "status-pending" : "status-checked-in"}>
                  {entry.status}
                </td>
                {entry.status === "pending" ? (
                  <td>
                    <button
                        onClick={() => {
                        setCheckInModal(true);
                        setDayToCheck(entry._id);
                        setEmployeeToVerify(entry.employeeId._id);
                      }}
                    >
                      Check in
                    </button>
                  </td>
                ) : entry.status === "checked-in"? (
                  <td>
                    <button
                        onClick={() => {
                        setCheckOutModal(true);
                        setDayToCheck(entry._id);
                        setShiftId(entry.shiftOfTheDay._id);
                        setEmployeeToVerify(entry.employeeId._id);
                      }}
                    >
                      Check-out
                    </button>
                  </td>
                ):(
                  <td>
                      Employee Ended Shift
                </td>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan="4">Loading</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {checkInModal && (
        <div className="dialog-overlay">
          <AttendanceModal
            shiftId={null}
            date={date.toISOString().split("T")[0]}
            status="checked-in"
            dailyStatusId={dayToCheck}
            currentEmployeeId={employeeToVerify}
          />
          <button onClick={() => setCheckInModal(false)}>Close</button>
        </div>
      )}
      {checkOutModal && (
        <div className="dialog-overlay">
          <AttendanceModal
            shiftId={shiftId}
            date={date.toISOString().split("T")[0]}
            status="checked-out"
            dailyStatusId={dayToCheck}
            currentEmployeeId={employeeToVerify}
          />
          <button onClick={() => setCheckOutModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
