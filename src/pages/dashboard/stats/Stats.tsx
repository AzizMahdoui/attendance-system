import React from 'react'
import StatCard from './stat-card/StatCard';
import {RiMapPinTimeFill} from "react-icons/ri"
import "./Stats.css"
interface DailyStats extends Document {
    totalEmployee?: number;
    totalEmployees?: number;
    onTimeEmployees?: number;
    lateEmployees?: number;
    absences?: number;
    day?: string;
    schedule?: string;
  }
const Stats = ({...props}:DailyStats) => {
  return (
    <div className='daily-stats-container'>
            <StatCard label="Total Employees" value={8} icon={<RiMapPinTimeFill size={26}/>}></StatCard>
            <StatCard label="Total Employees" value={8} icon={<RiMapPinTimeFill size={26}/>}></StatCard>
            <StatCard label="Total Employees" value={8} icon={<RiMapPinTimeFill size={26}/>}></StatCard>
            <StatCard label="Total Employees" value={8} icon={<RiMapPinTimeFill size={26}/>}></StatCard>
    </div>
  )
}

export default Stats