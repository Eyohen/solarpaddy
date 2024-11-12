import React from 'react'
import { BsArrowUpRight } from "react-icons/bs";

const MetricCard = ({bgColor, name}) => {
  return (
    <div style={{backgroundColor:bgColor}}
     className={`flex flex-col justify-between px-2 py-3 w-[240px] h-[150px] rounded-lg mt-12`}>


<div className='flex justify-between'>

        <div>
        <p className='font-semibold text-xl'>₦123,000</p>
        <p>{name}</p>
        </div>

        <BsArrowUpRight />

        </div>

        <p>+₦24,0000</p>
        
        
        </div>
  )
}

export default MetricCard