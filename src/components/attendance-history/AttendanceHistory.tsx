import React, { useEffect, useState } from 'react';
import AttendanceHistoryCard from './AttendanceHistoryCard';
import "./attendance.css"
interface Id {
  employeeId: string;
}

const AttendanceHistory = ({ employeeId }: Id) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:3000/shifts/history", {
          method: 'POST',
          body: JSON.stringify({ employeeId }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        setHistory(data.data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, [employeeId]);

  return (
    <div className='attendance-history'>
      {history.map((element) => (
        <AttendanceHistoryCard
          key={element.id}
          checkIn={element.checkIn}
          checkOut={element.checkOut}
        />
      ))}
    </div>
  );
};

export default AttendanceHistory;
