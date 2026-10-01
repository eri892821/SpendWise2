import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import spendwiseLogo from './assets/Gemini_Generated_Image.jfif'

const Sidebar =()=>{

  return(

    <div className="w-64 min-h-screen bg-[#0e63c5] text-white antialiased p-6">
      <div className="flex items-center gap-3 mb-8">
        <img src={spendwiseLogo} alt="SpendWise Logo" className="w-10 h-10 object-cover rounded-md" />
        <h2 className = "text-white text-2xl font-bold">SpendWise</h2>
      </div>
      <nav className="flex flex-col gap-4">
        <div className="text-sm text-white/80"><button onClick={() => console.log('Dashboard clicked')}>Dashboard</button></div>
        <div className="text-sm text-white/80">Accounts</div>
        <div className="text-sm text-white/80">Budgets</div>
        <div className="text-sm text-white/80">Saving goals</div>
        <div className="text-sm text-white/80">Categories</div>
      </nav>
      
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
