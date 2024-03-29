import React from 'react'

function InputBox({label, placeholder, onChange, type, value}) {
  return (
    <div className='px-4 my-6 font-normal'>
        <div className='text-teal-400 text-xl'>{label.toLowerCase()}</div>
        <div>
            <input value={value} onChange={onChange} type={type} placeholder={placeholder} className='w-full  mt-2 text-white text-xl antialiased border-gray-500 border-b bg-gray-700 focus:outline-none' />
        </div>
    </div>
  )
}

export default InputBox