//src/Pages/Farmer/Location.jsx
import React from 'react'
import LivestockTracker from '../../components/LivestockTracker'

const Location = () => {
  return (
  <>
   <div className='bg-white rounded-[2px] px-[70px] pt-[96px]'>
            
            <LivestockTracker/>
    </div>
    <div>
       <p>Animal 001 has left</p>
    </div>
  </>
   
  )
}

export default Location