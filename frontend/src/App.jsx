import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import {RecoilRoot} from 'recoil'

function App() {
  const [count, setCount] = useState(0)

  return (
        <RecoilRoot>
    <div className='font-normal antialiased'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
    </div>
    </RecoilRoot>
    )
}

export default App

