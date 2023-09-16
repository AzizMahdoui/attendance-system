import React from 'react';
import { Shift } from '../../exports/schemas';
import {AiOutlineClockCircle} from "react-icons/ai"
const AttendanceHistoryCard = ({ checkIn, checkOut }: Shift) => {
  const formatDateAndTime = (inputDate) => {
    if (!inputDate) {
      return '-';
    }

    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    const date = new Date(inputDate);
    const formattedDate = date.toLocaleString('en-US', options);

    return formattedDate;
  };

  const formattedCheckIn = formatDateAndTime(checkIn);
  const formattedCheckOut = formatDateAndTime(checkOut);

  return (
    
      
        <div className='history-card'>
            <div className='day-status'>
                  <AiOutlineClockCircle size={30}/>
                  <h3>{formattedCheckIn.split('at')[0]}</h3>
            </div>

            <div className='checkin-checkout-label-container'>
                <div className='checkout-label'>
                    <label>Check-Out Time:</label>
                    <p>
                    {formattedCheckOut.split(',')[1]?formattedCheckOut.split(',')[1]:"-"}
                    </p>
                </div>
                <div className='checkout-label'>
                    <label>Check-In Time:</label>
                    <p>
                    {formattedCheckIn.split('at')[1]?formattedCheckIn.split('at')[1]:"-"}
                    </p>
                </div>
            </div>
        
        </div>
        
      
      
   
  );
};

export default AttendanceHistoryCard;
