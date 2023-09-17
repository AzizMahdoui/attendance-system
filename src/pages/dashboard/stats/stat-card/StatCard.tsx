import React, { ReactNode } from 'react'

interface Card{
        label:String;
        icon:ReactNode;
        value:Number;
}
const StatCard = ({label,icon,value}:Card) => {
  return (
    <div className='daily-stats-card'>
            <div className='label-icon'>
                    <label>{label}</label>
                    {icon}
            </div>
            <h3>{value}</h3>
    </div>
  )
}

export default StatCard