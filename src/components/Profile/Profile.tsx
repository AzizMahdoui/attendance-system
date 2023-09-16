import React from 'react'
import "./Profile.css"
import {IoMdNotifications} from "react-icons/io"
export interface Profile{
    firstName:String;
    role:String;
    avatar:String;


}
const Profile = ({firstName,role,avatar}:Profile) => {
  return (
    <div className='profile-container'>
              <IoMdNotifications className="icon"/>
            <div className='profile-info'>
                    <p>{firstName}</p>
                    <p>{role}</p>
                    
            </div>
            <img src={avatar}/>

            
                      
                      
           
           
    </div>
  )
}

export default Profile