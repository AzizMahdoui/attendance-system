import React, { useEffect } from 'react';
 import { useDashboardContext } from '../../exports/context/Context';
import socketIOClient from 'socket.io-client';
import './dashboard.css';
import Stats from './stats/Stats';
import AttendanceModal from '../../components/Attendance/Attendance';
import DailyDataTable from './dashboard-table/Table';
import DashboardHeader from './header/DashboardHeader';
const Dashboard = () => {
  const {
    date,
    setDate,
    dailyData,
    setDailyData,
    checkInModal,
    setCheckInModal,
    checkOutModal,
    setCheckOutModal,
    dayToCheck,
    setDayToCheck,
    employeeToVerify,
    setEmployeeToVerify,
    shiftId,
    setShiftId,
    error,
    setError,
    setDailyStats,
    dailyStats
  } = useDashboardContext(); // Use the context hook to access context values

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('fetch_daily_data', date);
      
    });

    socket.on('daily_data', (data) => {
      setDailyData(data.data);
      console.log(data)
    });

    socket.on('error', (errorMessage) => {
      console.error('Server Error:', errorMessage);
      setError(errorMessage)
    });
    socket.on("daily_stats",(stats)=>{
        setDailyStats(stats)
        console.log(dailyStats)
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [date]);

  const handleChange = (e) => {
    setDate(new Date(e.target.value));
  };

  // const dailyStats = {
  //   totalEmployees: 30,
  //   onTimeEmployees: 18,
  //   lateEmployees: 7,
  //   absences: 15,
  // };

  return (
    <div className="dashboard">
      {(dailyStats && !error) &&(<Stats date={date} dailyStats={dailyStats.data}></Stats>)}
      {error &&(<p>{error}</p>)}

      <div className="dashboard-layout">
        <DashboardHeader date={date} setDate={setDate}/>
        {/* <input onChange={handleChange} type="date" value={date.toISOString().split('T')[0]} /> */}
      
      <DailyDataTable
        dailyData={dailyData}
        setCheckInModal={setCheckInModal}
        setDayToCheck={setDayToCheck}
        setEmployeeToVerify={setEmployeeToVerify}
        setCheckOutModal={setCheckOutModal}
        setShiftId={setShiftId}
        date={date}
      />
      {checkInModal && (
        <div className="dialog-overlay">
          <AttendanceModal
            shiftId={null}
            date={date.toISOString().split('T')[0]}
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
            date={date.toISOString().split('T')[0]}
            status="checked-out"
            dailyStatusId={dayToCheck}
            currentEmployeeId={employeeToVerify}
          />
          <button onClick={() => setCheckOutModal(false)}>Close</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
