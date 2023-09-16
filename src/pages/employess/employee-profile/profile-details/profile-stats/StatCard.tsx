import React from 'react'
import "./Profile.css"
const StatCard = ({ icon, label, value }) => {
  return (
    <div className='stat-card'>
        {icon} 
    
        <div className='role-value'>
                <h4>{value}</h4>    
                <label>
                    {label}
                </label>

                  
        </div>
    </div>
  )
}

export default StatCard