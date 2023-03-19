import React from 'react'
import {FaStar,FaStarHalfAlt} from "react-icons/fa";
import "./index.scss";

export default function Rating({rate}:any) {
  function roundRate(rate:any) {
    
    let roundedRate ;
    let stars ;
    if (rate % 1 >= 0.8) {
        roundedRate = Math.ceil(rate)
        stars = new Array(roundedRate).fill(<FaStar />)
    } else if (rate % 1 <= 0.3)  {
      roundedRate = Math.floor(rate)
      stars = new Array(roundedRate).fill(<FaStar />)
    } else {
        roundedRate = Math.floor(rate);
        let fullStars = new Array(roundedRate).fill(<FaStar />)
        let halfStars = new Array(1).fill(<FaStarHalfAlt />)
        stars = [...fullStars,...halfStars];
    }
    return stars;
  }

  

  return (
    <div className='course__icons'>{roundRate(rate)}</div>
  )
}
