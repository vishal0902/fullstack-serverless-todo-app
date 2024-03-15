import React, { useEffect, useState } from 'react'
import InputBox from '../ui/InputBox'
import Heading from '../ui/Heading'
import Button from '../ui/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TodoItem from './TodoItem'

export default function TodoList({todos, setTodoDone}) {




  return (
    <div className='mt-10 px-5 grid grid-cols-1 gap-5 max-h-[65vh] w-96 overflow-y-auto'>
            {todos?.map((todo)=>{
                return (
                    <TodoItem key={todo.id} todoId={todo.id}  title={todo.title} description={todo.description} done={todo.done} setTodoDone={setTodoDone}/>
                )
            })}      
                
               
    </div>
  )
}
