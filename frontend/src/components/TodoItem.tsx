import axios from 'axios'
import React, {useState} from 'react'
import Loader from '../ui/Loader'
import { BACKEND_URL } from '../config'
import LoaderSmallLight from '../ui/LoaderSmallLigh'

export default function TodoItem({title, description, done, todoId, setTodoDone}) {
  


  const [loading, setLoading] = useState(false)

  
  async function markDone(todoId, done){ 
    await axios({
      method: 'put',
      url: `${BACKEND_URL}/api/v1/todo/toggleDone`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }, 
      data: {
            id:todoId,
            done: !done
      }
    }).then((response)=>{
      console.log("Marked done.")
      setTodoDone((prev)=>!prev)
    })
  }
  

  async function deleteTodo(todoId){
    setLoading(true)
    await axios({
      method: 'delete',
      url: `${BACKEND_URL}/api/v1/todo/delete`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data:{
        id:todoId
      }
    }).then(async()=>{
      console.log("todo deleted.")
      setTodoDone((prev)=>!prev)
      // await new Promise(()=>setTimeout(()=>{}, 500))
      setLoading(false)

    })
  }

  return (
    <div>
         <div className='grid grid-cols-8 bg-gray-700 hover:bg-gray-900 rounded-md p-2 text-teal-400'> 
                <div className='col-span-1 p-3'>
                  <input value={done} onChange={()=>markDone(todoId, done)} type='checkbox' className='accent-teal-400 cursor-pointer w-5 h-5'/>
                </div>

                {done 
                ? <div className='col-span-6 grid line-through  grid-cols-1'>
                    <div className='text-2xl text-teal-300 line-through'>{title}</div>
                    <div className='text-sm line-through' >{description}</div>
                </div>
                : <div className='col-span-6 grid  grid-cols-1'>
                    <div className='text-2xl text-teal-300'>{title}</div>
                    <div className='text-sm' >{description}</div>
                </div>
                }

                




                <div className='col-span-1 flex justify-end p-3'>
                    
                    {loading ?
                    <LoaderSmallLight />
                    :
                    <svg onClick={()=>deleteTodo(todoId)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    
                    }
                    
                    

                </div>
                    
            </div>
    </div>
  )
}
