import React from 'react'
import StatCard from './stat-card/StatCard';
import {RiMapPinTimeFill} from "react-icons/ri"
import {BsFillPersonBadgeFill} from "react-icons/bs"
import {FcLeave} from 'react-icons/fc'
import {GiBugleCall} from "react-icons/gi"
import "./Stats.css"
interface DailyStats extends Document {
    totalEmployees?: number;
    onTimeEmployees?: number;
    lateEmployees?: number;
    absences?: number;
    day?: string;
    schedule?: string;
  }
const Stats = ({...props}) => {
  return (
    <div className='daily-stats'>
        <div className='date'>
            <GiBugleCall className='header-icon' size={65}/>
            <div onClick={()=>console.log(props.date)} className='date-label'>
            <h2>{props.date.toDateString()}</h2> {/* Convert date to a string for display */}
            <p>Daily Real Time Data</p>
            </div>
          
        </div>
      <div className='stats-cards'>
            <StatCard label="Total Employees" value={props.dailyStats.totalEmployees} icon={<BsFillPersonBadgeFill size={30}/>}></StatCard>
            <StatCard label="On Time Employees" value={props.dailyStats.onTimeEmployees} icon={<RiMapPinTimeFill color='green' size={30}/>}></StatCard>
            <StatCard label="Late Employees" value={props.dailyStats.lateEmployees} icon={<RiMapPinTimeFill  color='red'size={30}/>}></StatCard>
            <StatCard label="Absences" value={props.dailyStats.absences} icon={<FcLeave size={30}/>}></StatCard>
      </div>
            
    </div>
  )
}

export default Stats