import React from 'react'
import "./header.css"
const DashboardHeader = ({setDate,date}) => {
        const handleChange = (e) => {
            setDate(new Date(e.target.value));
          };
  return (
    <div className='dashboard-header'>
            <div className='title-date'>
                <div className='page-title'>
                        <h2>Employee Attendance</h2>
                        <p>Keep Track on Employees on a DailyBasis</p>
                </div>
                <div className='buttons'>
                        <input onChange={handleChange} type="date" value={date.toISOString().split('T')[0]} />
                        <button>Import</button>
                        <button>export</button>
                </div>
            </div>
            <div className='employee-filter-buttons'>

                
            </div>
    </div>
  )
}

export default DashboardHeader