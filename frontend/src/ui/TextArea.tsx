import React from 'react'

function TextArea({label, placeholder, onChange, value}) {
  return (
    <div className='px-4 my-6 text-sm'>
        <div className='text-teal-500'>{label}</div>
        <div>
            <textarea value={value} rows={5} autoComplete='on' onChange={onChange} placeholder={placeholder} className='w-full  mt-1 text-white border-gray-500 border-b bg-gray-700 focus:outline-none' />
        </div>
    </div>
  )
}

export default TextArea