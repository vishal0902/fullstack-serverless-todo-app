import React from 'react'
import Loader from './Loader'

function Button({buttonText, onClick}):any {
  return (
    <div className='flex justify-center'>
        <button onClick={onClick} className=' bg-teal-500 text-xl text-white w-1/2 h-12 rounded-3xl hover:bg-teal-300' type='button'>
          {buttonText}
          </button>
    </div>
  )
}

export default Button