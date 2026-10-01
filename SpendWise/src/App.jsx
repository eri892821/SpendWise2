import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'


const Sidebar =()=>{

  return(

    <div className="w-64 min-h-screen bg-[#0e63c5] text-white antialiased p-6">
      <h2 className = "text-white text-2xl font-bold">SpendWise</h2>
    </div>

  )

}

const App =()=>{
  return(
   <div className="flex min-h-screen w-full">
    <Sidebar/>
   </div>
  )
}

export default App
