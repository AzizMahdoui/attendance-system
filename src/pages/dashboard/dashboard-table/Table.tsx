import React from 'react';

const DailyDataTable = ({ dailyData, setCheckInModal, setDayToCheck, setEmployeeToVerify, setCheckOutModal, setShiftId, date }) => {
  return (
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
          {dailyData ? (
            dailyData.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.employeeId?.firstName}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td className={entry.status === 'pending' ? 'status-pending' : 'status-checked-in'}>
                  {entry.status}
                </td>
                {entry.status === 'pending' ? (
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
                ) : entry.status === 'checked-in' ? (
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
                ) : (
                  <td>Employee Ended Shift</td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DailyDataTable;
