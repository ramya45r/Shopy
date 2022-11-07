import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
   <>
    <div className='text-center mt-52 font-extrabold text-red-900 text-2xl'>
        404 ERROR PAGE
    </div>
    <div className='text-center'>
        <Link to ="/"> <button className='bg-green-700 text-white mt-6'>Back to home</button></Link>
         </div>
    
    </>
  )
}

export default Error
