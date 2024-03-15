import React, { useState } from 'react'
import InputBox from '../ui/InputBox'
import Heading from '../ui/Heading'
import Button from '../ui/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TextArea from '../ui/TextArea'
import LoaderSmallLight from '../ui/LoaderSmallLigh'

export default function AddTodo({title, description, setTitle, setDescription, addTodo, addTodoLoader, setAddTodoLoader}) {


  return (
    <div className='w-96 mt-10'>
            <div className=' bg-gray-700 pt-6 min-h-[65vh] rounded-md '>
                <div className='mb-10 flex text-center'>
                    <Heading text="Add Your Todo" />
                </div>
                <InputBox type="text" value={title} onChange={(e:any)=>setTitle(e.target.value)} label="Title" placeholder="Title here" />
                <TextArea value={description} onChange={(e:any)=>setDescription(e.target.value)} label="Description" placeholder="Desciption here" />
                {/* <InputBox type="text" value={description} onChange={(e:any)=>setDescription(e.target.value)} label="Description" placeholder="Desciption here" /> */}
                
                {addTodoLoader ? <div className='flex justify-center'><LoaderSmallLight /></div>:<Button  buttonText="Add Todo" onClick = {addTodo} />}
                
                
               
            </div>
    </div>
  )
}

