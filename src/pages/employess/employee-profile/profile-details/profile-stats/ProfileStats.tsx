import React from 'react'
import { CgEnter } from "react-icons/cg";
import { FcLeave } from "react-icons/fc";
import { PiShoppingBagOpenBold } from "react-icons/pi";
import { BsFillCalculatorFill } from "react-icons/bs";
import StatCard from './StatCard';
const ProfileStats = () => {
    const snippet = {
        totalAttendances:28,
        averageCheckinTime:"11:15AM",
        averageCheckOutTime:"8:15PM",
        role:"UI Designer"
}
  return (
    <div className='profile-stats-container'>
            <StatCard icon={<BsFillCalculatorFill className="stat-icon" size={50} />} label="Total Attendances" value={snippet.totalAttendances}/>
            <StatCard icon={<CgEnter className="stat-icon" size={50} />} label="Average Checkin Time" value={snippet.averageCheckinTime}/>
            <StatCard icon={<FcLeave className="stat-icon" size={50} />} label="Average Check-Out Time" value={snippet.averageCheckOutTime}/>
            <StatCard icon={<PiShoppingBagOpenBold className="stat-icon" size={50} />} label="Role" value={snippet.role}/>
    </div>
  )
}

export default ProfileStats