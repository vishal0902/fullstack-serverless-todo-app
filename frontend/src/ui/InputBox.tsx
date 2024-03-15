import React from 'react'

function InputBox({label, placeholder, onChange, type, value}) {
  return (
    <div className='px-4 my-6 text-sm'>
        <div className='text-teal-500'>{label}</div>
        <div>
            <input value={value} onChange={onChange} type={type} placeholder={placeholder} className='w-full  mt-1 text-white border-gray-500 border-b bg-gray-700 focus:outline-none' />
        </div>
    </div>
  )
}

export default InputBox