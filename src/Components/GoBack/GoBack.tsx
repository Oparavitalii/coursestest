import React from 'react'
import {FaArrowLeft} from "react-icons/fa";
import {Link} from "react-router-dom";
import "./index.scss";
export default function GoBack() {
  return (
    <div className='back'>
        <div className="back__item">
            <FaArrowLeft />
            <Link to='/' className='back__link'>Go back</Link>
        </div>
    </div>
  )
}
