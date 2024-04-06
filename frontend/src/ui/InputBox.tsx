import React from 'react'

function InputBox({label, placeholder, onChange, type, value}) {
  return (
    <div className='px-4 mt-4 font-normal'>
        <div className='text-teal-400 text-md'>{label.toLowerCase()}</div>
        <div>
            <input value={value} onChange={onChange} type={type} placeholder={placeholder} className='w-full  mt-1 text-white text-base antialiased border-gray-500 border-b bg-gray-700 focus:outline-none' />
        </div>
    </div>
  )
}

export default InputBox