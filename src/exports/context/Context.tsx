import { createContext, useContext, useState } from 'react';


const DashboardContext = createContext(null);

export function useDashboardContext() {
  return useContext(DashboardContext);
}

export const DashboardProvider = ({ children }:{children:React.ReactNode})=> {
  const [date, setDate] = useState(new Date());
  const [dailyData, setDailyData] = useState([]);
  const [checkInModal, setCheckInModal] = useState(false);
  const [checkOutModal, setCheckOutModal] = useState(false);
  const [dayToCheck, setDayToCheck] = useState("");
  const [employeeToVerify, setEmployeeToVerify] = useState("");
  const [shiftId, setShiftId] = useState("");
  const [error,setError] = useState(null)
  const [dailyStats,setDailyStats] = useState(null)

  // const dailyStats = {
  //   totalEmployees: 30,
  //   onTimeEmployees: 18,
  //   lateEmployees: 7,
  //   absences: 15,
  // };

  return (
    <DashboardContext.Provider
      value={{
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
        dailyStats,
        setDailyStats,
      error,
    setError}}
    >
      {children}
    </DashboardContext.Provider>
  );
}
