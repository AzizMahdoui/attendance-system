import React from 'react'
import { Employee } from '../../../../exports/schemas'
import {MdOutlineDateRange} from 'react-icons/md'
import {FiDownload} from "react-icons/fi"
import ProfileStats from './profile-stats/ProfileStats'
const ProfileDetails = ({...props}:Employee) => {
    
  return (
    <div className='profile-details'>
        <div className='title-export-filter'>
          <h2>Employee Details</h2>
          <div className='export-filter'>
              <div className='date-input'>
                      <MdOutlineDateRange size={26}/>
                      <p>This Month</p> 
                </div>
                <div className='export-btn'>
                        <FiDownload size={16}/>
                        <p>DownLoad Info</p>
                </div>
          </div>
            
            
        </div>
       
        <div className='profile-details-info-container'>
            <div className='profile-avatar'>
                <img alt='test' src={props.avatar}/>
            </div>
            <div className='profile-details-info'>
                <h2>{props.firstName} {props.lastName}</h2>
                <div className='profile-employee-adresse'>
                      <div className='employee-credential'>
                          <p>Role</p>
                          <p>{props.position}</p>
                      </div>
                      <div className='employee-credential'>
                          <p>Phone No</p>
                          <p>{props.phoneNumber}</p>
                      </div>
                      <div className='employee-credential'>
                          <p>Email Adresse</p>
                          <p>{props.email}</p>
                      </div>
                </div>
            </div>
        </div>
        
                <ProfileStats/>
        
    </div>
  )
}

export default ProfileDetails