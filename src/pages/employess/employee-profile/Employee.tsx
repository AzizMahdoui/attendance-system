import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Employee.css'
import {employeeProfile} from '../../../exports/utils.ts'
import AttendanceHistory from '../../../components/attendance-history/AttendanceHistory.tsx'
import {AiFillEdit} from "react-icons/ai"
import ProfileDetails from './profile-details/ProfileDetails'
const Employee = () => {
    const {id}:{id:String} = useParams()
    const [employeeProfile,setEmployeeProfile] = useState(null)
    const [Loading,setLoading] = useState<Boolean>(true)
    const [error,setError] = useState<any>(null)
    useEffect(()=>{
        const fetchEmployeeProfile = async(id:String)=>{
            try{
                const response = await fetch(`http://localhost:3000/api/employee/${id}`,{
                    method:"GET"
                })
                const data = await response.json()
                if(data.success){
                    setEmployeeProfile(data.data)
                    setLoading(false)
                }
                else{
                    setError(data.message)
                }
               
            }catch(err){
                setError(err)
            }
                   
        }   
        fetchEmployeeProfile(id)        
    },[])
  return (
    <div className='employee-profile'>
            {Loading &&(<h3>Loading...</h3>)}
            {employeeProfile&&(
                <ProfileDetails
                id={employeeProfile._id}
                avatar={employeeProfile.avatar}
                firstName={employeeProfile.firstName}
                lastName={employeeProfile.lastName}
                email={employeeProfile.email}
                phoneNumber={employeeProfile.phoneNumber}
                position={employeeProfile.position}
             />
             
            )}

            <div className='history'>
                    <h2>Attendance History</h2>
                    <AttendanceHistory employeeId={id}/>
            </div>
    </div>
  )
}

export default Employee