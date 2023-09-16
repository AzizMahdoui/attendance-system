import React from 'react'
import { Employee } from '../../../exports/schemas'
import { Link } from 'react-router-dom'
import "./Card.css"
const Card = ({...props}) => {
  return (
    <div className='employee-card-container'>
            <img src={props.avatar}/>
            <p className='name'>{props.firstName} {props.lastName}</p>
            <p className='position'>{props.position}</p>
            <Link className='details-link' to={`/employees/${props.id}`}>More Details</Link>

    </div>
  )
}

export default Card